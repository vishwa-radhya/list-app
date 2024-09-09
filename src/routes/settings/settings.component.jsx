import './settings.styles.css';
import {auth} from '../../utils/firebase.js';
import settingsSvg from '../../assets/settings-12.svg';
import { signOutUser } from '../../utils/firebase.js';
import { signInWithGoogle } from '../../utils/firebase.js';
import { useContext,useEffect,useRef,useState } from 'react';
import { AuthContext } from '../../contexts/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FolderNamesContext } from '../../contexts/folder-names-context.jsx';

const Settings=()=>{
    const imageUrl = auth.currentUser?.photoURL;
    const userName = auth.currentUser?.displayName;
    const userEmail = auth.currentUser?.email;
    const lastLoginAt = auth.currentUser?.metadata.lastSignInTime.replace('GMT','');
    const navigateRouter = useNavigate();
    const {folderNames}=useContext(FolderNamesContext);
    const settingsDivRef = useRef(null);
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

    useEffect(()=>{
        if(settingsDivRef.current){
            settingsDivRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void settingsDivRef.current.offsetWidth;
            settingsDivRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[])

    return(
        <div className='settings-div animate__animated animate__fadeIn' ref={settingsDivRef}>
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
                    <div className='clickable gray-bg' onClick={signInWithGoogle}>
                        <i className='fa-regular fa-user' ></i>
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
                        <i className='fa-solid fa-arrow-right-from-bracket' style={{color:'#FF6768'}}></i>
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
                            <i className='fa-solid fa-rocket'></i>
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