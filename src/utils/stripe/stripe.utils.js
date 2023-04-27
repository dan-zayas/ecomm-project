import { loadStripe } from "@stripe/stripe-js";

const apiKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(apiKey);