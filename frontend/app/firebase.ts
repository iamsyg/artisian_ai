// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyATvnoRzlOZB_vJinIgmHa0XGopf37DtzU",
  authDomain: "artisanai-2e48b.firebaseapp.com",
  projectId: "artisanai-2e48b",
  storageBucket: "artisanai-2e48b.firebasestorage.app",
  messagingSenderId: "241297005299",
  appId: "1:241297005299:web:887ef3837f0d730af2b586",
  measurementId: "G-9MMXFT5YCW"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export { app };