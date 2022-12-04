import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}`,
  projectId: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  storageBucket: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  messagingSenderId: `${process.env.FIREBASE_APP_ID}`,
  appId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
  measurementId: `${process.env.FIREBASE_KEY}`
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyC-CehY2KTdOVerlTLSJ2PU8Xcx9T-gR5A',
//   authDomain: 'teniski-varna.firebaseapp.com',
//   projectId: 'teniski-varna',
//   storageBucket: 'teniski-varna.appspot.com',
//   messagingSenderId: '756720586054',
//   appId: '1:756720586054:web:85c28ff48c874cf95ea947',
//   measurementId: 'G-4KKJN85TH7'
// };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
