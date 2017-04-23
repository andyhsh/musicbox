import Firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

Firebase.initializeApp(FIREBASE_CONFIG);

const firebaseDB = Firebase.database();

export default firebaseDB;
