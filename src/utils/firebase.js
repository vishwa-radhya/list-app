import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,setPersistence,browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// realtime databse
export const database = getDatabase(app);

// firestore
export const firestoreDatabase = getFirestore(app);

export const auth = getAuth(app);

// google sign in popup
const provider = new GoogleAuthProvider();
export const signInWithGoogle=async()=>{
  try{
    await signInWithPopup(auth,provider);
  }catch(error){
    console.log(error);
  }
}

// google signout
export const signOutUser = async()=>{
  try{
    await signOut(auth);
    localStorage.removeItem('persistenceConfigured');
  }catch(e){
    console.log('error signing out',e);
  }
}

//setting local persistence for faster auth load
const initializeAuth = async () => {
  const isConfigured = localStorage.getItem('persistenceConfigured');

  if (isConfigured) return;

  try {
    console.log('set local persistence');
    await setPersistence(auth, browserLocalPersistence);
    localStorage.setItem('persistenceConfigured', 'true');
  } catch (e) {
    console.error('error setting persistence:', e);
  }
};
initializeAuth();