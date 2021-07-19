// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDezegftjeXpp5wiGHk-14Q8kzvIK9aaSk",
  authDomain: "challenge-e4653.firebaseapp.com",
  projectId: "challenge-e4653",
  storageBucket: "challenge-e4653.appspot.com",
  messagingSenderId: "1043701517206",
  appId: "1:1043701517206:web:0adbe5fb97f2312f392bb7",
  measurementId: "G-TK7795BFH8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
