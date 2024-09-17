import TypeWriter from '../../components-3/typewriter/TypeWriter.component.jsx';
import './Auth.styles.css';
import {signInWithGoogle} from '../../utils/firebase.js';
import cartImage from '../../../favicons/favicon-32x32.png'
import { FaKeycdn,FaGoogle } from 'react-icons/fa6';

const Auth=()=>{
    return(
        <div className="auth-container">
        <img src={cartImage} alt="" />
        <h2 className='au-h2'><FaKeycdn className="fa-keycdn"></FaKeycdn><span>Authentication</span></h2>
        <TypeWriter text='  Sign In To Organize Your Lists...' speed={20}/>
            <button className="ggl-pop-up-btn" onClick={signInWithGoogle}>
        <FaGoogle className="fa-google" ></FaGoogle>
                <span>Sign In</span>
            </button>
        </div>
    )
}
export default Auth;
