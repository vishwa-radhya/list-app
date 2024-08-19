import './settings.styles.css';
import {auth} from '../../utils/firebase.js';
import settingsSvg from '../../assets/settings-svg.svg';
import { signOutUser } from '../../utils/firebase.js';
import { signInWithGoogle } from '../../utils/firebase.js';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext.jsx';
import { useNavigate } from 'react-router-dom';

const Settings=()=>{
    const imageUrl = auth.currentUser.photoURL;
    const userName = auth.currentUser.displayName;
    const userEmail = auth.currentUser.email;
    const lastLoginAt = auth.currentUser.metadata.lastSignInTime.replace('GMT','');
    const navigateRouter = useNavigate();
    const {handleSetUser}=useContext(AuthContext);
    async function handleSignOutUser(){
        await signOutUser();
    }

    return(
        <div className='settings-div'>
        <div className='settings-img'>
            <img src={settingsSvg} alt="settings-image" />
            <p>Settings</p>
        </div>
            <div className='settings-div-user-img'>
                <img src={imageUrl} alt="user-profile-pic" width={30} />
                <p>{userName}</p>
            </div>
            <div className='account-div'>
                <h5>Account</h5>
                <div className='items'>
                    <div>
                        <i className='fa-regular fa-envelope'></i>
                        <div className='inner-block'>
                            <p>Email</p>
                            <span>{userEmail}</span>
                        </div>
                    </div>
                    <div>
                        <i className='fa-regular fa-clock'></i>
                        <div className='inner-block'>
                            <p>Last Login</p>
                            <span>{lastLoginAt}</span>
                        </div>
                    </div>
                    <div className='clickable blue' onClick={signInWithGoogle}>
                        <i className='fa-regular fa-user' style={{color:"#69A5FF"}}></i>
                        <div className='inner-block'>
                            <p style={{color:"#69A5FF"}}>Switch</p>
                            <span style={{color:"#69A5FF"}}>Click to switch user accounts</span>
                        </div>
                    </div>
                    <div className='clickable red' onClick={
                        ()=>{ 
                            handleSignOutUser()
                            handleSetUser(null);
                    }}>
                        <i className='fa-solid fa-arrow-right-from-bracket' style={{color:'#FF6768'}}></i>
                        <div className='inner-block '>
                            <p style={{color:'#FF6768'}}>Sign Out</p>
                            <span style={{color:'#FF6768'}}>Click to sign out</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='info-div'>
                    <h5>About</h5>
                    <div className='items'>
                            <div onClick={()=>navigateRouter('/about')} className='gray-bg clickable'>
                            <i className='fa-solid fa-circle-info'></i>
                            <div className='inner-block'>
                                <p>App Info</p>
                                <span>Click to view app info</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default Settings;