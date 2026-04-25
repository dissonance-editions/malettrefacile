/**
 * Abstraction over postal mail providers (Merci Facteur, La Poste CILE, etc).
 * Swap implementations without changing app code.
 */

export type MailType = "simple" | "recommande" | "recommande_ar";

export interface MailAddress {
  fullName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  country?: string; // default: "FR"
}

export interface MailQuoteInput {
  type: MailType;
  pages: number;
  inColor?: boolean;
  duplex?: boolean;
}

export interface MailQuote {
  type: MailType;
  pages: number;
  /** Provider's cost in euros (HT) */
  providerCostHT: number;
  /** Final price for end user in euros (TTC), markup included */
  finalPriceTTC: number;
  /** TVA in euros */
  tva: number;
  /** Estimated delivery time in business days */
  estimatedDeliveryDays: number;
}

export interface MailSendInput {
  type: MailType;
  pdfBuffer: Buffer | Uint8Array;
  sender: MailAddress;
  recipient: MailAddress;
  /** Optional reference for tracking on our side */
  externalRef?: string;
}

export interface MailSendResult {
  /** Provider's tracking ID */
  providerRef: string;
  /** Tracking URL if available */
  trackingUrl?: string;
  /** Status at creation */
  status: "pending" | "in_production" | "sent" | "delivered" | "failed";
  /** Date of acceptance by provider */
  acceptedAt: Date;
}

export interface MailingProvider {
  readonly name: string;
  quote(input: MailQuoteInput): Promise<MailQuote>;
  send(input: MailSendInput): Promise<MailSendResult>;
  /** Optional: get latest status from provider */
  getStatus?(providerRef: string): Promise<MailSendResult>;
}
