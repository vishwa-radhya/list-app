import { useEffect, useState } from 'react'
import './App.css'
import Container from './container/container.component'
import Auth from './auth/Auth.component';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Loader from './loader/loader.component';
function App() {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const checkAuthState = async()=>{
        try{
          const result = await getRedirectResult(auth);
          if(result && result.user){
            setUser(result.user);
          }else{
            onAuthStateChanged(auth,(user)=>{
              setUser(user);
              setLoading(false);
            })
          }
        }catch(e){
          console.error('Error handling redirect result',e);
          setLoading(false);
        }
      }
      checkAuthState();
    },[]);

    function handleAuth(user){
      setUser(user);
    }
    console.log(user);
  return (
    <>
    {loading ? (
      <Loader />
    ) : !user ? (
      <Auth handleAuth={handleAuth} />
    ) : (
      <Container />
    )}
    </>
  )
}

export default App
