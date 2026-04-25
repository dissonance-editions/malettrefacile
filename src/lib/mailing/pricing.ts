import type { MailType } from "./types";

/**
 * Provider costs in euros HT (Merci Facteur indicative pricing — to be refined).
 * Includes printing B&W simplex up to 4 pages + envelope + stamp.
 */
const PROVIDER_BASE_COST_HT: Record<MailType, number> = {
  simple: 1.29,
  recommande: 5.80,
  recommande_ar: 6.50,
};

/** Cost per additional page beyond 4 pages (HT). */
const ADDITIONAL_PAGE_COST = 0.08;

/**
 * Markup applied on top of provider cost.
 * Designed to remain attractive vs. La Poste guichet pricing.
 */
const MARKUP: Record<MailType, number> = {
  simple: 0.70,
  recommande: 2.19,
  recommande_ar: 3.49,
};

const TVA_RATE = 0.20;

/** Estimated delivery in business days. */
const DELIVERY_DAYS: Record<MailType, number> = {
  simple: 3,
  recommande: 3,
  recommande_ar: 4,
};

export interface PriceComputation {
  providerCostHT: number;
  markupHT: number;
  totalHT: number;
  tva: number;
  finalPriceTTC: number;
  estimatedDeliveryDays: number;
}

export function computePrice(
  type: MailType,
  pages: number
): PriceComputation {
  const base = PROVIDER_BASE_COST_HT[type];
  const extraPages = Math.max(0, pages - 4);
  const providerCostHT = base + extraPages * ADDITIONAL_PAGE_COST;
  const markupHT = MARKUP[type];
  const totalHT = providerCostHT + markupHT;
  const tva = totalHT * TVA_RATE;
  const finalPriceTTC = +(totalHT + tva).toFixed(2);

  return {
    providerCostHT: +providerCostHT.toFixed(2),
    markupHT,
    totalHT: +totalHT.toFixed(2),
    tva: +tva.toFixed(2),
    finalPriceTTC,
    estimatedDeliveryDays: DELIVERY_DAYS[type],
  };
}

export const MAIL_TYPE_LABELS: Record<MailType, string> = {
  simple: "Lettre simple",
  recommande: "Recommandé sans accusé",
  recommande_ar: "Recommandé avec accusé de réception",
};

export const MAIL_TYPE_DESCRIPTIONS: Record<MailType, string> = {
  simple: "Envoi standard, sans preuve de réception. Idéal pour les courriers d'information.",
  recommande: "Preuve d'envoi avec numéro de suivi. Reçu par le destinataire contre signature.",
  recommande_ar: "Preuve d'envoi + preuve de réception signée. Valeur juridique maximale (résiliation, mise en demeure).",
};
