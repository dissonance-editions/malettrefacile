import type { MailingProvider } from "./types";
import { MockProvider } from "./mockProvider";
import { MerciFacteurProvider } from "./merciFacteurProvider";

let cached: MailingProvider | null = null;

/**
 * Returns the configured mailing provider.
 * Selection is based on env: if MERCI_FACTEUR_API_KEY is set, use real provider.
 * Otherwise, fall back to MockProvider.
 */
export function getMailingProvider(): MailingProvider {
  if (cached) return cached;

  const apiKey = process.env.MERCI_FACTEUR_API_KEY;
  if (apiKey && apiKey !== "mock") {
    cached = new MerciFacteurProvider(apiKey);
  } else {
    cached = new MockProvider();
  }
  return cached;
}

export { computePrice, MAIL_TYPE_LABELS, MAIL_TYPE_DESCRIPTIONS } from "./pricing";
export type {
  MailingProvider,
  MailType,
  MailAddress,
  MailQuote,
  MailSendInput,
  MailSendResult,
} from "./types";
