import * as functions from 'firebase-functions';
import { stripe } from './plugins/stripe';

const create = functions.https.onCall(async (data, context) => {
  const { params, options } = data;
  return await stripe.paymentIntents.create(params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const retrieve = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.paymentIntents.retrieve(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const update = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.paymentIntents.update(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const confirm = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.paymentIntents.confirm(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const capture = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.paymentIntents.capture(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const cancel = functions.https.onCall(async (data, context) => {
  const { id, params, options } = data;
  return await stripe.paymentIntents.cancel(id, params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

const list = functions.https.onCall(async (data, context) => {
  const { params, options } = data;
  return await stripe.paymentIntents.list(params, options)
    .then(r => { return { type: 'ok', value: r }; })
    .catch((error: Error) => { return { type: 'err', error }; });
});

export const paymentIntents = {
  create,
  retrieve,
  update,
  confirm,
  capture,
  cancel,
  list,
};
