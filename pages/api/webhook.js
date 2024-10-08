import mongooseConnect from "@/lib/mongoose";
import { buffer } from "micro";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for webhook
  },
};

export default async function handler(req, res) {
  await mongooseConnect();

  // Verify the request method
  if (req.method !== "POST") {
    return res.status(405).send('Method Not Allowed'); // Respond only to POST requests
  }

  let event;

  try {
    // Use buffer to handle raw request body
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    // Verify the event with Stripe
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log('Event received:', event);

    // Handle the event types you are interested in
    switch (event.type) {
      case 'customer.created':
        const customer = await stripe.customers.retrieve(event.data.object.id);
        console.log('Customer retrieved:', customer);
        break;
      case 'charge.succeeded':
        console.log('Charge succeeded:', event.data.object);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', event.data.object);
        break;
      case 'checkout.session.completed':
        console.log('Checkout session completed:', event.data.object);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    // Acknowledge receipt of the event
    return res.status(200).send('Webhook received successfully');
  } catch (err) {
    console.error('Error processing webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`); // Return 400 for errors in processing
  }
}
