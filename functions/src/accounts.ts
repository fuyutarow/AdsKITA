import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { stripe } from './plugins/stripe';

const create = functions.https.onCall(async (data, context) => {
  const { params, options } = data;
  return await stripe.accounts.create(params, options);
});

const retrieve = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.accounts.retrieve(id, params, options);
});

export const accounts = {
  create,
  retrieve,
};

