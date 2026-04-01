import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFKxK1tHUptvtaqqRRSBC0Ou9vh5jxAKc",
  authDomain: "chesspulse-faacc.firebaseapp.com",
  projectId: "chesspulse-faacc",
  storageBucket: "chesspulse-faacc.firebasestorage.app",
  messagingSenderId: "957477307302",
  appId: "1:957477307302:web:7437053a9549d968fbc567",
  measurementId: "G-G2Z1LFH3KJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
