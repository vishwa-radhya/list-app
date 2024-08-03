import { useContext, useEffect, useState } from 'react'
import './App.css'
import Container from './container/container.component'
import Auth from './auth/Auth.component';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Loader from './loader/loader.component';
import AuthLoader from './loader/auth-loader.component';
import { AuthContext } from './contexts/authContext';
import { BrowserRouter } from 'react-router-dom';
function App() {
    const {user,handleSetUser}=useContext(AuthContext);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      const checkAuthState = async () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if(user){
            handleSetUser(user);
            setLoading(false);
          }else{
            setLoading(false);
            handleSetUser(null);
          }
        });
        return () => unsubscribe();
      };
      setLoading(true);
      checkAuthState();      
    }, [handleSetUser]);
  
  
  return (
    <>
    { loading ? (
      <AuthLoader/>
    ): !user ? (
      <Auth/>
    ) : (
      <BrowserRouter>
        <Container/>
      </BrowserRouter>
    )}
    </>
  )
}

export default App
