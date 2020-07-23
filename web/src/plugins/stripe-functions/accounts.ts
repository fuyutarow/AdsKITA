import Stripe from 'stripe';
import { functions } from 'plugins/firebase';
import { wrapThrow } from './helper';

const create = async (data: {
  params?: Stripe.AccountCreateParams | undefined;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-create')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const retrieve = async (data: {
  id: string;
  params?: Stripe.AccountRetrieveParams | undefined;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-retrieve')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const update = async (data: {
  id: string;
  params?: Stripe.AccountUpdateParams | undefined;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-update')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};
const del = async (data: {
  id: string;
  params?: Stripe.AccountDeleteParams | undefined;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-del')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};
const reject = async (data: {
  id: string;
  params: Stripe.AccountRejectParams;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-reject')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};
const list = async (data: {
  params?: Stripe.AccountListParams | undefined;
  options?: Stripe.RequestOptions | undefined;
}) => {
  return await functions.httpsCallable('stripe-accounts-list')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

export const accounts = {
  create,
  retrieve,
  update,
  del,
  reject,
  list,
};
