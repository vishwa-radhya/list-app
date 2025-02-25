import './settings.styles.css';
import {auth} from '../../utils/firebase.js';
import settingsSvg from '../../assets/settings-12.svg';
import { signOutUser } from '../../utils/firebase.js';
import { signInWithGoogle } from '../../utils/firebase.js';
import { useContext,useState } from 'react';
import { AuthContext } from '../../contexts/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FolderNamesContext } from '../../contexts/folder-names-context.jsx';
import { MdOutlineEmail } from 'react-icons/md';
import { FaRegClock,FaRegUser,FaRocket,FaLock,FaCircleInfo } from 'react-icons/fa6';
import { PiSignOutBold } from 'react-icons/pi';

const Settings=()=>{
    const imageUrl = auth.currentUser?.photoURL;
    const userName = auth.currentUser?.displayName;
    const userEmail = auth.currentUser?.email;
    const lastLoginAt = auth.currentUser?.metadata.lastSignInTime.replace('GMT','');
    const navigateRouter = useNavigate();
    const {folderNames}=useContext(FolderNamesContext);
    const {handleSetUser}=useContext(AuthContext);
    const [landingRoute,setLandingRoute]=useState(()=>{
        return localStorage.getItem('landingRoute') || 'Home';
    })
    async function handleSignOutUser(){
        await signOutUser();
    }

    const handleSelectChange=(e)=>{
        const selectedValue = e.target.value;   
        setLandingRoute(selectedValue);
        localStorage.setItem('landingRoute',selectedValue);
    }

    return(
        <div className='settings-div animate__animated animate__fadeIn'>
        <div className='settings-img'>
            <img src={settingsSvg} alt="settings-image" />
            <p>Settings</p>
        </div>
            <div className='settings-div-user-img'>
                <img src={imageUrl} alt="user" width={30} />
                <p>{userName}</p>
            </div>
            <div className='account-div'>
                <h5>Account</h5>
                <div className='items'>
                    <div>
                        <MdOutlineEmail className='st-i'></MdOutlineEmail>
                        <div className='inner-block'>
                            <p>Email</p>
                            <span>{userEmail}</span>
                        </div>
                    </div>
                    <div>
                        <FaRegClock className='st-i'></FaRegClock>
                        <div className='inner-block'>
                            <p>Last Login</p>
                            <span>{lastLoginAt}</span>
                        </div>
                    </div>
                    <div className='clickable gray-bg' onClick={signInWithGoogle}>
                        <FaRegUser className='st-i' ></FaRegUser>
                        <div className='inner-block'>
                            <p >Switch</p>
                            <span >Click to switch user accounts</span>
                        </div>
                    </div>
                    <div className='clickable red' onClick={
                        ()=>{ 
                            handleSignOutUser()
                            handleSetUser(null);
                    }}>
                        <PiSignOutBold className='st-i' style={{color:'#FF6768'}}></PiSignOutBold>
                        <div className='inner-block '>
                            <p style={{color:'#FF6768'}}>Sign Out</p>
                            <span style={{color:'#FF6768'}}>Click to sign out</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='app-settings-div'>
                    <h5>App</h5>
                    <div className="items">
                        <div>
                            <FaRocket className='st-i'></FaRocket>
                            <div className='inner-block'>
                                <p>Landing Place</p>
                                <span>Select a default landing place from below.</span>
                            </div>
                            </div>
                            <select name="landing-place-select" id="landing-place-select" onChange={handleSelectChange} value={landingRoute}>
                                <option value="/">Home</option>
                                <option value="fav">Favorites</option>
                                {folderNames.map(folderName=>{
                                    return <option value={`folders/${folderName}`} key={folderName}>{folderName}</option>
                                })}
                            </select>
                            <div className='clickable gray-bg' onClick={()=>navigateRouter('/change-privacy-pin')}>
                                <FaLock className='st-i'></FaLock>
                                <div className='inner-block'>
                                    <p>Change Privacy Pin</p>
                                    <span>Click to change privacy pin</span>
                                </div>
                            </div>
                    </div>
            </div>
            <div className='info-div'>
                    <h5>About</h5>
                    <div className='items'>
                            <div onClick={()=>navigateRouter('/about')} className='gray-bg clickable'>
                            <FaCircleInfo className='st-i'></FaCircleInfo>
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