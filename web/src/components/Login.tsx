import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};
