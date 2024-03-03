import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCgQZ2cuxsH2rs8Zvo6LtHYuPV85YFnPpw",
  authDomain: "solace-7773a.firebaseapp.com",
  projectId: "solace-7773a",
  storageBucket: "solace-7773a.appspot.com",
  messagingSenderId: "899019846459",
  appId: "1:899019846459:web:b77eb8f79ef886fd3e3d1e",
  measurementId: "G-8F8GZ18QJ7"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = firebase.auth();

export { app, db, auth, firebase };