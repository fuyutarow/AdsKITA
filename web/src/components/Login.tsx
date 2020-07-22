import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useHistory } from 'react-router-dom';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Stripe from 'stripe';

import { auth, functions } from 'plugins/firebase';
import { debug, DebugButton } from 'plugins/debug';
import { config as stripeConfig, badge as stripeBadge } from 'plugins/stripe';

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
        <DebugButton children="notice" onClick={e => {
          noticeme();
        }} />
        <DebugButton children="account retrieve" onClick={async e => {
          console.log('oiiio');
          const acc = await retrieve({
            id: 'acct_1H6EpFL2CNVURAeA',
          });
          debug('okko');
          const account = acc.data as Stripe.Account;
          debug(account);
        }} />
      </div>
    </>
  );
};
