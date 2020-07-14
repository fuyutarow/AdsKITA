import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { auth } from 'plugins/firebase';

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
