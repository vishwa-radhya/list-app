import './Dropdown.styles.css'
import PropTypes from 'prop-types';
import { signOutUser } from '../utils/firebase';
import { signInWithGoogle } from '../utils/firebase';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
const Dropdown=({userImg,displayName,userEmail,isDropdownOpen})=>{

    const {handleSetUser}=useContext(AuthContext);

    const userEmailStyles={
        fontSize:userEmail.length<=19 ? '0.9rem' : '0.75rem',
    }
    async function handleSignOutUser(){
        await signOutUser();
    }
    const dropdownStyles={
        width:isDropdownOpen ? '62%' : '0%',
        height:isDropdownOpen ? '210px' : '0%'
    }
    return(
        <div className="drop-down-container" style={dropdownStyles}>
            <div className="dd-block-1">
            <div className="profile-pic">
                <img src={userImg} alt="" />
            </div>
            </div>
            <div className="dd-block-2">
                <h4>{displayName}</h4>
                <p style={userEmailStyles}>{userEmail}</p>
                <div className="switch-acc" onClick={signInWithGoogle}>
                <i className="fa-solid fa-users"></i><span>Switch Account</span>
                </div>
                <div className="sign-out-user" onClick={
                    ()=>{ handleSignOutUser()
                        handleSetUser(null);
                }}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i><span>Sign Out</span>
                </div>
            </div>
        </div>
    )
}
Dropdown.propTypes={
    userImg:PropTypes.string,
    displayName:PropTypes.string,
    userEmail:PropTypes.string,
    isDropdownOpen:PropTypes.bool,
}
export default Dropdown;