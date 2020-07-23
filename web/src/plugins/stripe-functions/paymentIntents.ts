import Stripe from 'stripe';
import { functions } from 'plugins/firebase';
import { wrapThrow } from './helper';

const create = async (
  params: Stripe.PaymentIntentCreateParams,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { params, options };
  return await functions.httpsCallable('stripe-paymentIntents-create')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const retrieve = async (
  id: string,
  params?: Stripe.PaymentIntentRetrieveParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-paymentIntents-retrieve')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const update = async (
  id: string,
  params?: Stripe.PaymentIntentUpdateParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-paymentIntents-update')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const confirm = async (
  id: string,
  params?: Stripe.PaymentIntentConfirmParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-paymentIntents-confirm')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const capture = async (
  id: string,
  params?: Stripe.PaymentIntentCaptureParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-paymentIntents-capture')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const cancel = async (
  id: string,
  params?: Stripe.PaymentIntentCancelParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-paymentIntents-cancel')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

const list = async (
  params?: Stripe.PaymentIntentListParams | undefined,
  options?: Stripe.RequestOptions | undefined
) => {
  const data = { params, options };
  return await functions.httpsCallable('stripe-paymentIntents-list')(data)
    .then(r => wrapThrow<Stripe.PaymentIntent>(r));
};

export const paymentIntents = {
  create,
  retrieve,
  update,
  confirm,
  capture,
  cancel,
  list,
};
