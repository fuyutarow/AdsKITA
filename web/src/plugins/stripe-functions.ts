
import Stripe from 'stripe';
import { functions } from 'plugins/firebase';

const accounts = {
  retrieve: async (data: {
    id: string;
    params?: Stripe.AccountRetrieveParams | undefined;
    options?: Stripe.RequestOptions | undefined;
  }) => {
    const r = await functions.httpsCallable('accountsRetrieve')(data);
    return r.data as Stripe.Account;
  },
};

export const stripe = {
  accounts,
};
