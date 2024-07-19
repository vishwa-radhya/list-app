import TypeWriter from '../typewriter/TypeWriter.component';
import './Auth.styles.css';
import {signInWithGoogle} from '../utils/firebase.js';

const Auth=()=>{
    return(
        <div className="auth-container">
        <img src="https://v-list-app.netlify.app/assets/auth-icon.png" alt="" />
        <h2><i className="fa-brands fa-keycdn"></i>Authentication</h2>
        <TypeWriter text='  Sign In To Organize Your Lists...' speed={50}/>
            <button className="ggl-pop-up-btn" onClick={signInWithGoogle}>
        <i className="fa-brands fa-google" ></i>
                <span>Sign In</span>
            </button>
        </div>
    )
}
export default Auth;
