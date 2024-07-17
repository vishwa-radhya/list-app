import TypeWriter from '../typewriter/TypeWriter.component';
import './Auth.styles.css';
import {auth,signInWithGoogle} from '../utils/firebase.js';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
const Auth=({handleAuth})=>{

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                handleAuth(user);
            }
        });

        getRedirectResult(auth).then((result)=>{
            if(result && result.user){
                handleAuth(result.user);
            }
        }).catch((error)=>{
            console.error('Error handling redirect',error);
        });
        return ()=>unsubscribe();
    },[handleAuth]);

    return(
        <div className="auth-container">
        <img src="/favicons/favicon-32x32.png" alt="" />
        <h2><i className="fa-brands fa-keycdn"></i>Authentication</h2>
        <TypeWriter text='  Sign In To Organize Your Lists...' speed={79}/>
            <button className="ggl-pop-up-btn" onClick={signInWithGoogle}>
        <i className="fa-brands fa-google" ></i>
                <span>Sign In</span>
            </button>
        </div>
    )
}
Auth.propTypes={
    handleAuth:PropTypes.func,
}
export default Auth;