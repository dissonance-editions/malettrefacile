import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Product IDs — set these after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  unit: process.env.STRIPE_PRICE_UNIT!, // 1,99€ one-time
  premium: process.env.STRIPE_PRICE_PREMIUM!, // 4,99€/month
} as const;
