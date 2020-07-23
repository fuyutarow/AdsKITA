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

const update = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.accounts.update(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const del = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.accounts.del(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const reject = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.accounts.reject(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const list = functions.https.onCall(async (data, context) => {
  const { params, options } = data;
  return await stripe.accounts.list(params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

export const accounts = {
  create,
  retrieve,
  update,
  del,
  reject,
  list,
};

