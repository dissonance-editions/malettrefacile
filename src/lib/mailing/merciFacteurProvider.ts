import type {
  MailingProvider,
  MailQuote,
  MailQuoteInput,
  MailSendInput,
  MailSendResult,
} from "./types";
import { computePrice } from "./pricing";

/**
 * Merci Facteur API integration.
 *
 * Documentation: https://www.mercifacteur.com/api-documentation
 * Pricing reference: https://www.mercifacteur.com/tarifs-courrier
 *
 * IMPORTANT: This is a structural skeleton. Endpoints, payload shapes
 * and auth header names MUST be verified against current Merci Facteur
 * API docs before going live. Update once you have the credentials.
 */
export class MerciFacteurProvider implements MailingProvider {
  readonly name = "mercifacteur";
  private readonly apiKey: string;
  private readonly apiBase: string;

  constructor(apiKey: string, apiBase = "https://api.mercifacteur.com/v1") {
    if (!apiKey) {
      throw new Error("MerciFacteurProvider: missing API key");
    }
    this.apiKey = apiKey;
    this.apiBase = apiBase;
  }

  async quote(input: MailQuoteInput): Promise<MailQuote> {
    // We compute price locally using our pricing module.
    // Merci Facteur exposes a tariff endpoint we could also call to refresh
    // base costs periodically.
    const { type, pages } = input;
    const price = computePrice(type, pages);
    return {
      type,
      pages,
      providerCostHT: price.providerCostHT,
      finalPriceTTC: price.finalPriceTTC,
      tva: price.tva,
      estimatedDeliveryDays: price.estimatedDeliveryDays,
    };
  }

  async send(input: MailSendInput): Promise<MailSendResult> {
    const { type, pdfBuffer, sender, recipient, externalRef } = input;

    // Map our MailType to Merci Facteur product code
    // (verify exact codes in their docs)
    const productCode = {
      simple: "LETTRE_SIMPLE",
      recommande: "RECOMMANDE",
      recommande_ar: "RECOMMANDE_AR",
    }[type];

    const formData = new FormData();
    formData.append("product", productCode);
    formData.append(
      "sender",
      JSON.stringify({
        name: sender.fullName,
        company: sender.company,
        address1: sender.addressLine1,
        address2: sender.addressLine2,
        zip: sender.postalCode,
        city: sender.city,
        country: sender.country || "FR",
      })
    );
    formData.append(
      "recipient",
      JSON.stringify({
        name: recipient.fullName,
        company: recipient.company,
        address1: recipient.addressLine1,
        address2: recipient.addressLine2,
        zip: recipient.postalCode,
        city: recipient.city,
        country: recipient.country || "FR",
      })
    );
    if (externalRef) {
      formData.append("external_ref", externalRef);
    }

    const blob = new Blob([new Uint8Array(pdfBuffer as Uint8Array)], {
      type: "application/pdf",
    });
    formData.append("document", blob, "letter.pdf");

    const response = await fetch(`${this.apiBase}/letters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(
        `Merci Facteur send failed: ${response.status} — ${err.slice(0, 200)}`
      );
    }

    const data = (await response.json()) as {
      id: string;
      tracking_url?: string;
      status?: string;
    };

    return {
      providerRef: data.id,
      trackingUrl: data.tracking_url,
      status: "pending",
      acceptedAt: new Date(),
    };
  }

  async getStatus(providerRef: string): Promise<MailSendResult> {
    const response = await fetch(`${this.apiBase}/letters/${providerRef}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    if (!response.ok) {
      throw new Error(`Merci Facteur status failed: ${response.status}`);
    }
    const data = (await response.json()) as {
      id: string;
      status: string;
      tracking_url?: string;
      accepted_at?: string;
    };
    const statusMap: Record<string, MailSendResult["status"]> = {
      pending: "pending",
      processing: "in_production",
      sent: "sent",
      delivered: "delivered",
      failed: "failed",
    };
    return {
      providerRef: data.id,
      status: statusMap[data.status] || "pending",
      trackingUrl: data.tracking_url,
      acceptedAt: data.accepted_at ? new Date(data.accepted_at) : new Date(),
    };
  }
}
