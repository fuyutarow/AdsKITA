import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { stripe } from './plugins/stripe';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const retrieve = functions.https.onCall(async (data, context) => {
  const args = data as {
    id: string,
    params?: Stripe.AccountRetrieveParams | undefined,
    options?: Stripe.RequestOptions | undefined
  };
  const account = await stripe.accounts.retrieve(args.id, args.params, args.options);
  return {
    data: {
      account: account,
    },
  };
});
