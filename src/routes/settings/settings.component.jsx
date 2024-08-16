import './settings.styles.css';
import {auth} from '../../utils/firebase.js';
import settingsSvg from '../../assets/settings-svg.svg';
const Settings=()=>{
    const imageUrl = auth.currentUser.photoURL;
    const userName = auth.currentUser.displayName;
    const userEmail = auth.currentUser.email;
    const lastLoginAt = auth.currentUser.metadata.lastSignInTime.replace('GMT','');
    
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
                    <div className='clickable'>
                        <i className='fa-regular fa-user'></i>
                        <div className='inner-block'>
                            <p>Switch</p>
                            <span>Click to switch user accounts</span>
                        </div>
                    </div>
                    <div style={{color:'#FF6768'}} className='clickable'>
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <div className='inner-block'>
                            <p>Sign Out</p>
                            <span>Click to sign out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;