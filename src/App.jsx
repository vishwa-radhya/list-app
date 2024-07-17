import { useEffect, useState } from 'react'
import './App.css'
import Container from './container/container.component'
import Auth from './auth/Auth.component';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Loader from './loader/loader.component';
function App() {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
        setUser(user);
        setLoading(false);
      })
      return ()=>unsubscribe();
    },[user]);
    function handleAuth(user){
      setUser(user);
    }
  return (
    <>
      {loading ? <Loader width='50px' height='50px' /> : !user ? <Auth handleAuth={handleAuth} /> : <Container/>}
    </>
  )
}

export default App
