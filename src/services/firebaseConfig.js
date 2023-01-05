import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDZNigdWjO0RkoEAGibgtI1iyggDdSD9tQ',
  authDomain: 'drivent-f52a1.firebaseapp.com',
  projectId: 'drivent-f52a1',
  storageBucket: 'drivent-f52a1.appspot.com',
  messagingSenderId: '285698501422',
  appId: '1:285698501422:web:138637bad548fb77b1e8bf',
  measurementId: 'G-PL2WMTL1JQ',
};

export const app = initializeApp(firebaseConfig);
getAnalytics(app);
