// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB-JBQoN65NB1zY0W2svmltaHPocDtog4",
  authDomain: "fir-4f56f.firebaseapp.com",
  projectId: "fir-4f56f",
  storageBucket: "fir-4f56f.appspot.com",
  messagingSenderId: "464292974767",
  appId: "1:464292974767:web:7a5a83f476fea05464c45a",
  measurementId: "G-SCZ9KE2DFJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firestore(app);
const auth = getAuth(app);
