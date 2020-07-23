
import Stripe from 'stripe';
import { functions } from 'plugins/firebase';

const accounts = {
  create: async (data: {
    params?: Stripe.AccountCreateParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    const r = await functions.httpsCallable('stripe-accounts-create')(data);
    return r.data as Stripe.Account;
  },
  retrieve: async (data: {
    id: string;
    params?: Stripe.AccountRetrieveParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    const r = await functions.httpsCallable('stripe-accounts-retrieve')(data);
    return r.data as Stripe.Account;
  },
};

export const stripe = {
  accounts,
};
