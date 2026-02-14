// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb90WxN2z_bXdtg9Kr2J44EyMdNm7eQpI",
  authDomain: "hmsbe-86eaa.firebaseapp.com",
  projectId: "hmsbe-86eaa",
  storageBucket: "hmsbe-86eaa.firebasestorage.app",
  messagingSenderId: "1035857812663",
  appId: "1:1035857812663:web:3ab665c91903ab522f0132",
  measurementId: "G-RHLLPJ7G1Z"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;
