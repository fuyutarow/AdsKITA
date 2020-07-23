
import Stripe from 'stripe';
import { functions } from 'plugins/firebase';
import { ok, err, Result } from 'neverthrow';

const wrapResult = <T>(r: firebase.functions.HttpsCallableResult) => {
  const result: Result<T, Error> = r.data.type === 'ok'
    ? ok(r.data.value)
    : err(r.data.error);
  return result;
};

const accounts = {
  create: async (data: {
    params?: Stripe.AccountCreateParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    const r = await functions.httpsCallable('stripe-accounts-create')(data)
      .then(r => wrapResult<Stripe.Account>(r));
    if (r.isOk()) { return r.value; } else { throw r.error; }
  },
  retrieve: async (data: {
    id: string;
    params?: Stripe.AccountRetrieveParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    const r = await functions.httpsCallable('stripe-accounts-retrieve')(data)
      .then(r => wrapResult<Stripe.Account>(r));
    if (r.isOk()) { return r.value; } else { throw r.error; }
  },
};

export const stripe = {
  accounts,
};
