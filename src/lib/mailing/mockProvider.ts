import type {
  MailingProvider,
  MailQuote,
  MailQuoteInput,
  MailSendInput,
  MailSendResult,
} from "./types";
import { computePrice } from "./pricing";

/**
 * MockProvider — simulates a postal mail provider for development.
 * Returns realistic prices and fake tracking IDs.
 * No real letter is sent.
 */
export class MockProvider implements MailingProvider {
  readonly name = "mock";

  async quote(input: MailQuoteInput): Promise<MailQuote> {
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
    // Simulate small network delay
    await new Promise((r) => setTimeout(r, 250));

    const fakeId = `MOCK-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    return {
      providerRef: fakeId,
      trackingUrl: undefined,
      status: "pending",
      acceptedAt: new Date(),
    };
  }

  async getStatus(providerRef: string): Promise<MailSendResult> {
    return {
      providerRef,
      status: "in_production",
      acceptedAt: new Date(),
    };
  }
}
