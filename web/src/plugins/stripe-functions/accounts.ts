import Stripe from 'stripe';
import { functions } from 'plugins/firebase';
import { wrapThrow } from './helper';

const create = async (
  params?: Stripe.AccountCreateParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { params, options };
  return await functions.httpsCallable('stripe-accounts-create')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const retrieve = async (
  id: string,
  params?: Stripe.AccountRetrieveParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-retrieve')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const update = async (
  id: string,
  params?: Stripe.AccountUpdateParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-update')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};
const del = async (
  id: string,
  params?: Stripe.AccountDeleteParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-del')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};
const reject = async (
  id: string,
  params: Stripe.AccountRejectParams,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-reject')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const list = async (
  params?: Stripe.AccountListParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { params, options };
  return await functions.httpsCallable('stripe-accounts-list')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const createPerson = async (
  id: string,
  params?: Stripe.PersonCreateParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-createPerson')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const retrievePerson = async (
  accountId: string,
  id: string,
  params?: Stripe.PersonRetrieveParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { accountId, id, params, options };
  return await functions.httpsCallable('stripe-accounts-retrievePerson')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const updatePerson = async (
  accountId: string,
  id: string,
  params?: Stripe.PersonUpdateParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { accountId, id, params, options };
  return await functions.httpsCallable('stripe-accounts-updatePerson')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const deletePerson = async (
  accountId: string,
  id: string,
  params?: Stripe.PersonDeleteParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { accountId, id, params, options };
  return await functions.httpsCallable('stripe-accounts-deletePerson')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

const listPersons = async (
  id: string,
  params?: Stripe.PersonListParams | undefined,
  options?: Stripe.RequestOptions | undefined,
) => {
  const data = { id, params, options };
  return await functions.httpsCallable('stripe-accounts-listPersons')(data)
    .then(r => wrapThrow<Stripe.Account>(r));
};

export const accounts = {
  create,
  retrieve,
  update,
  del,
  reject,
  list,
  createPerson,
  retrievePerson,
  updatePerson,
  deletePerson,
  listPersons,
};
