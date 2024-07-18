import TypeWriter from '../typewriter/TypeWriter.component';
import './Auth.styles.css';
import {auth,signInWithGoogle} from '../utils/firebase.js';
import {  onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext.jsx';
const Auth=()=>{
  const {handleSetUser}=useContext(AuthContext);
    useEffect(()=>{
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              handleSetUser(user);
            }else{
              console.log('no user found');
            }
          });
      
          return () => unsubscribe();
    },[handleSetUser]);

    return(
        <div className="auth-container">
        <img src="https://v-list-app.netlify.app/assets/auth-icon.png" alt="" />
        <h2><i className="fa-brands fa-keycdn"></i>Authentication</h2>
        <TypeWriter text='  Sign In To Organize Your Lists...' speed={79}/>
            <button className="ggl-pop-up-btn" onClick={signInWithGoogle}>
        <i className="fa-brands fa-google" ></i>
                <span>Sign In</span>
            </button>
        </div>
    )
}
export default Auth;