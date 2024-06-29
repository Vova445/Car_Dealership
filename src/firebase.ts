import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDbG7FBdoy8vNZJ_dm-1ZcZtHhRtRdorIA",
  authDomain: "cardealership-b2ed7.firebaseapp.com",
  projectId: "cardealership-b2ed7",
  storageBucket: "cardealership-b2ed7.appspot.com",
  messagingSenderId: "390897001399",
  appId: "1:390897001399:web:cf80e50bfb1367466dbe32",
  measurementId: "G-X2NXGXBYSS"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };