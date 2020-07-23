import * as functions from 'firebase-functions';
import { stripe } from './plugins/stripe';

const create = functions.https.onCall(async (data, context) => {
  const { params, options } = data;
  return await stripe.accounts.create(params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const retrieve = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.accounts.retrieve(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

export const accounts = {
  create,
  retrieve,
};

