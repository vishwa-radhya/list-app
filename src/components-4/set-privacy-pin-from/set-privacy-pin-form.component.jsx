import './set-privacy-pin-form.styles.css'
import { useState } from 'react';
import { auth,database } from '../../utils/firebase';
import {  ref, set } from 'firebase/database';
import PropTypes from 'prop-types';

const SetPrivacyPinForm=({isPrivacyPinSetRequired})=>{

    const [choosePin,setChoosePin]=useState('');
    const [confirmPin,setConfirmPin]=useState('');
    const [isIncorrectPin,setIsIncorrectPin]=useState(false);
    const [successPinSet,setSuccessPinSet]=useState(false);
    const user = auth.currentUser;


    const handlePrivacyFolderPinSet=()=>{
        if(choosePin && confirmPin){
            if(choosePin.length===4 && confirmPin.length===4){
                if(choosePin === confirmPin){
                    pushPinToDb()
                }else{
                    setIsIncorrectPin(true);
                }
            }
            
        }
    }
    
    const pushPinToDb=()=>{
        const userRefInDb = ref(database,`shoppingLists/${user.uid}/additionalInfo/privacyPin`);
        if(isPrivacyPinSetRequired){
            set(userRefInDb,confirmPin).then(()=>setSuccessPinSet(true));
        }else{
            set(userRefInDb,confirmPin).then(()=>setSuccessPinSet(true))
        }
    }

    return(
        <div className='inputs-div-folder-privacy'>
            <p style={{textAlign:'center'}}>Must be 4 digits</p>
            <div>
                <label>Choose Pin</label>
                <input type='text' maxLength={4} value={choosePin}
                onChange={
                    (e)=>{
                        const val = e.target.value;
                        if(/^\d*$/.test(val))setChoosePin(val)
                        if(isIncorrectPin) setIsIncorrectPin(false)
                    }
                    } />
            </div>
            <div>
                <label>Confirm Pin</label>
                <input type='text' maxLength={4}  value={confirmPin}
                onChange={
                    (e)=>{
                        const val =e.target.value;
                        if(/^\d*$/.test(val))setConfirmPin(val)
                        if(isIncorrectPin) setIsIncorrectPin(false)
                    }
                    } />
            </div>
            <button onClick={handlePrivacyFolderPinSet}>OK</button>
            {isIncorrectPin && <p style={{textAlign:'center'}}>unmatched pins try again</p>}
            {successPinSet && <p style={{textAlign:'center'}}>Pin Created Successfully</p>}
            </div>
    )
}
SetPrivacyPinForm.propTypes={
    isPrivacyPinSetRequired:PropTypes.bool
}
export default SetPrivacyPinForm;