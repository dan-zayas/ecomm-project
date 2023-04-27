import { loadStripe } from "@stripe/stripe-js";

const apiKey = `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`;

export const stripePromise = loadStripe(apiKey);