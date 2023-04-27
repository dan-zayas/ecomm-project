// Netlify Function (stripe-handler.js)
import stripePackage from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripePackage(apiKey);

export async function handler(event) {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request body' }),
      };
    }

    const { amount } = JSON.parse(event.body);

    if (!amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing amount' }),
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Update this to your specific domain if needed
      },
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
}
