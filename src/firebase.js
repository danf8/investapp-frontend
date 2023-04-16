// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, signInWithPopup, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5w7XAmg-S4vi9BHSBWi3GXJC1c2LPurY",
  authDomain: "investing-app-1.firebaseapp.com",
  projectId: "investing-app-1",
  storageBucket: "investing-app-1.appspot.com",
  messagingSenderId: "735981584735",
  appId: "1:735981584735:web:106fe44a42beded149b6ea"
};

// Initialize Firebase with the given configuration obj
const app = initializeApp(firebaseConfig);

//config the provider - Google
const provider = new GoogleAuthProvider();

//create a ref to our firebase auth instance
const auth = getAuth(app);


//config signup & sign in
function signUp(email, password) {
    // Create user with email and password
    return createUserWithEmailAndPassword(auth, email, password);
};

function profileUpdate (displayName) {
  try {
    console.log("Updating display name:", displayName);
    updateProfile(auth.currentUser, { displayName: displayName.toString() });
    console.log("Profile updated successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};


function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
};

//config login & logout workflows
function loginWithGoogle(){
  return signInWithPopup(auth, provider)
  // .then(() => {
  //   window.location.href = '/form';
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

function logout(){
  return signOut(auth);
};

//export functionality for access inside of React
export {signUp, signIn, loginWithGoogle, logout, auth, app, profileUpdate};