import { useContext, useEffect, useState } from 'react'
import './App.css'
import Container from './container/container.component'
import Auth from './auth/Auth.component';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Loader from './loader/loader.component';
import { AuthContext } from './contexts/authContext';
function App() {
    // const [user,setUser]=useState(null);
    const {user,handleSetUser}=useContext(AuthContext);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      const checkAuthState = async () => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          handleSetUser(user);
          setLoading(false);
        });
        return () => unsubscribe();
      };
  
      checkAuthState();
    }, [handleSetUser]);
  
   
  
    console.log('Current user:', user);
  return (
    <>
    {loading ? (
      <Loader />
    ) : !user ? (
      <Auth />
    ) : (
      <Container />
    )}
    </>
  )
}

export default App
