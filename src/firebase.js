import firebase from 'firebase';
// import { FIREBASE_CONFIG } from '../config';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBAsJV6haRjlrg9jKl1q8FbKygRR2cLX6U',
  authDomain: 'musicbox-165108.firebaseapp.com',
  databaseURL: 'https://musicbox-165108.firebaseio.com',
  storageBucket: 'musicbox-165108.appspot.com',
};
// Set up firebase and initialise
firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
