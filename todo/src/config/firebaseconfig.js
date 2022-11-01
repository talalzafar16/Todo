// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAASe88-vSOzqDOcvLhkAStbQw9WNZblMw",
  authDomain: "todo-cf39d.firebaseapp.com",
  projectId: "todo-cf39d",
  storageBucket: "todo-cf39d.appspot.com",
  messagingSenderId: "987905783039",
  appId: "1:987905783039:web:e88ba331b2b10e127a88ca",
  measurementId: "G-53N86QTMF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;