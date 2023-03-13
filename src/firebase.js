// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, signInWithPopup, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB38Zhr2JhYQIVERAXnili2icqBMoPWnPU",
  authDomain: "investing-buddy-app.firebaseapp.com",
  projectId: "investing-buddy-app",
  storageBucket: "investing-buddy-app.appspot.com",
  messagingSenderId: "181490635572",
  appId: "1:181490635572:web:13ed50793a9dbbec980b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//config the provider - Google
const provider = new GoogleAuthProvider();

//create a ref to our firebase auth instance
const auth = getAuth(app);

//config signup & sign in
function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
};

function profileUpdate (displayName) {
  try {
    updateProfile(auth.currentUser, { displayName: displayName.toString() });
    // console.log("Profile updated successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
};

//config login & logout workflows
function login(){
  return signInWithPopup(auth, provider);
};

function logout(){
  return signOut(auth);
};

//export functionality for access inside of React
export {signUp, signIn, login, logout, auth, app, profileUpdate};