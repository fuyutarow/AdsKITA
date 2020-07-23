import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stripe from 'stripe';

import { debug, DebugButton } from 'plugins/debug';
import { config as stripeConfig, badge as stripeBadge } from 'plugins/stripe';
import { stripe } from 'plugins/stripe-functions';

import Button from '@material-ui/core/Button';

export default () => {
  const history = useHistory();
  const [stripeClient, setStripeClient] = useState<Stripe | null>(null);
  const [customer, setCustomer] = useState<Stripe.Customer | null>(null);

  const accountId = 'acct_1H6MjGAYV5ArU4EY';
  // useEffect(
  //   () => {
  //     const listen = async () => {
  //       const stripeClient = new Stripe(
  //         stripeConfig.publicKey,
  //         { stripeAccount: accountId }
  //       );
  //       setStripeClient(stripeClient);
  //     };
  //     listen();
  //   },
  //   []
  // );

  // useEffect(
  //   () => {
  //     const listen = async () => {
  //       if (!stripeClient) return;
  //       const customer = await stripeClient.customers.create(
  //         { email: 'person@example.edu' },
  //         { stripeAccount: accountId }
  //       );
  //       setCustomer(customer);
  //     };
  //     listen();
  //   },
  //   [stripeClient]
  // );

  return (
    <>
      <div>payment intents </div>
      < DebugButton children="charge to platform and transfer from platform to co-account" onClick={async e => {
        const paymentIntent = await stripe.paymentIntents.create({
          payment_method_types: ['card'],
          amount: 1000,
          currency: 'jpy',
          transfer_data: {
            destination: accountId,
          },
        });
        debug(paymentIntent);
      }
      } />
      < hr />
      <div>
        <img src="https://stripe.com/img/docs/connect/application_fee_amount.svg" />
      </div>
      < DebugButton children="pay from co-account to platforma as application fee" onClick={async e => {
        const paymentIntent = await stripe.paymentIntents.create({
          payment_method_types: ['card'],
          amount: 1000,
          currency: 'jpy',
          application_fee_amount: 123,
          transfer_data: {
            destination: accountId,
          },
        });
        debug(paymentIntent);
      }} />
      < hr />
      <DebugButton children="accounts create" onClick={async e => {
        const account = await stripe.accounts.create({
          country: 'JP',
          type: 'custom',
          requested_capabilities: ['card_payments', 'transfers'],
        });
        debug(account);
      }} />
      < div > accountId: {accountId} </div>
      < DebugButton onClick={e => {
        debug(customer);

      }} />
      < hr />
      <DebugButton children="accounts create" onClick={async e => {
        const account = await stripe.accounts.create({
          type: 'custom',
          country: 'US',
          email: 'jenny.rosen@example.com',
          requested_capabilities: [
            'card_payments',
            'transfers',
          ],
        });
        debug(account);
      }} />
      <DebugButton children="accounts retrieve" onClick={async e => {
        const account = await stripe.accounts.retrieve(
          'acct_1H6EpFL2CNVURAeA',
        );
        debug(account);
      }} />
      < DebugButton children="accounts update" onClick={async e => {
        const account = await stripe.accounts.update(
          'acct_1H6EpFL2CNVURAeA',
          { metadata: { order_id: '6735' } },
        );
        debug(account);
      }} />
      < DebugButton children="accounts del" onClick={async e => {
        const account = await stripe.accounts.del(
          'acct_1H6EpFL2CNVURAeA',
        );
        debug(account);
      }} />
    </>
  );
};
