import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useHistory } from 'react-router-dom';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Stripe from 'stripe';

import { auth, functions } from 'plugins/firebase';
import { debug, DebugButton } from 'plugins/debug';
import { config as stripeConfig, badge as stripeBadge } from 'plugins/stripe';
import { stripe } from 'plugins/stripe-functions';

import Button from '@material-ui/core/Button';

const noticeme = functions.httpsCallable('notice');
const retrieve = functions.httpsCallable('accountsRetrieve');

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  // callbacks: {
  //   signInSuccessWithAuthResult: (
  //     authResult: firebase.auth.UserCredential,
  //     redirectURL: string,
  //   ) => {
  //     const currentUser = authResult.user;
  //     return true;
  //   },
  // },
};

export default () => {
  const history = useHistory();

  return (
    <>
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
      <div >
        <Button
          variant='contained'
          onClick={e => {
            window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${stripeConfig.ca}&scope=read_write`;
          }}
        >
          <span style={{ padding: '0 10px 0 0' }}>
            決済
          </span>
          <img src={stripeBadge} />
        </Button>
        <hr />
        <DebugButton children="accounts create" onClick={async e => {
          const account = await stripe.accounts.create({
            country: 'JP',
            type: 'custom',
            requested_capabilities: ['card_payments', 'transfers'],
          });
          debug(account);
        }} />
        <div>accountId: {accountId}</div>
        <DebugButton onClick={e => {
          debug(customer);

        }} />
        <hr />
        <DebugButton children="notice" onClick={e => {
          noticeme();
        }} />
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
        <DebugButton children="accounts update" onClick={async e => {
          const account = await stripe.accounts.update(
            'acct_1H6EpFL2CNVURAeA',
            { metadata: { order_id: '6735' } },
          );
          debug(account);
        }} />
        <DebugButton children="accounts del" onClick={async e => {
          const account = await stripe.accounts.del(
            'acct_1H6EpFL2CNVURAeA',
          );
          debug(account);
        }} />
      </div>
    </>
  );
};
