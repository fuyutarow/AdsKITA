
import Stripe from 'stripe';
import { functions } from 'plugins/firebase';
import { ok, err, Result } from 'neverthrow';

const wrapResult = <T>(r: firebase.functions.HttpsCallableResult) => {
  const result: Result<T, Error> = r.data.type === 'ok'
    ? ok(r.data.value)
    : err(r.data.error);
  return result;
};

const wrapThrow = <T>(r: firebase.functions.HttpsCallableResult) => {
  if (r.data.type === 'ok') {
    return r.data.value;
  } else {
    throw r.data.error;
  }
};

const accounts = {
  create: async (data: {
    params?: Stripe.AccountCreateParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-create')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
  retrieve: async (data: {
    id: string;
    params?: Stripe.AccountRetrieveParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-retrieve')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
  update: async (data: {
    id: string;
    params?: Stripe.AccountUpdateParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-update')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
  del: async (data: {
    id: string;
    params?: Stripe.AccountDeleteParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-del')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
  reject: async (data: {
    id: string;
    params: Stripe.AccountRejectParams;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-reject')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
  list: async (data: {
    params?: Stripe.AccountListParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    return await functions.httpsCallable('stripe-accounts-list')(data)
      .then(r => wrapThrow<Stripe.Account>(r));
  },
};

export const stripe = {
  accounts,
};
