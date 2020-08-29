import firebase from 'firebase';
import { isDevelopment } from 'plugins/env';
export const firebaseConfig = require('config/firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export const ga = firebase.analytics();
export const auth = firebase.auth();
// export const db = isDevelopment
//   ? firebase.firestore().collection('stage').doc('dev')
//   : firebase.firestore().collection('stage').doc('alpha');
export const db = firebase.firestore();
export const functions = firebase.functions();
