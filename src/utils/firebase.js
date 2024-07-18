import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle=async()=>{
  try{
    await signInWithPopup(auth,provider);
  }catch(error){
    console.log(error);
  }
}

export const signOutUser = async()=>{
  try{
    await signOut(auth);
  }catch(e){
    console.log('error signing out',e);
  }
}