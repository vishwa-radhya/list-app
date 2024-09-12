import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import { useContext, useState } from 'react';
import { ref,push } from 'firebase/database';
import { database,auth } from '../../utils/firebase';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { useNavigate } from 'react-router-dom';

const FolderPrivacy=()=>{

    const [choosePin,setChoosePin]=useState('');
    const [confirmPin,setConfirmPin]=useState('');
    const [successPinSet,setSuccessPinSet]=useState(false);
    const [isIncorrectPin,setIsIncorrectPin]=useState(false);
    const [isGetStartedSelected,setIsGetStartedSelected]=useState(false);
    const user = auth.currentUser;
    const {storedPrivacyPin}=useContext(AditionalInfoContext);
    const navigateRouter = useNavigate();

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
        push(userRefInDb,confirmPin).then(()=>setSuccessPinSet(true))
    }

    return(
        <div className="folder-privacy-div animate__animated animate__fadeIn" >
            <SvgWithLoader svgimg={PrivacyItems}  />
            <p style={{fontWeight:'550'}}>Privacy Folders</p>
            {!storedPrivacyPin ? <button onClick={()=>setIsGetStartedSelected(true)}>Get Started</button>
            : <button onClick={()=>navigateRouter('/privacy-folder')}>Open Privacy Folder</button>}
            {isGetStartedSelected && !storedPrivacyPin && <div className='inputs-div'>
            <p style={{textAlign:'center'}}>Must be 4 digits</p>
            <div>
                <label>Choose Pin</label>
                <input type='password' maxLength={4} 
                onChange={
                    (e)=>{setChoosePin(e.target.value)
                        if(isIncorrectPin) setIsIncorrectPin(false)
                    }
                    } />
            </div>
            <div>
                <label>Confirm Pin</label>
                <input type='password' maxLength={4} 
                onChange={
                    (e)=>{setConfirmPin(e.target.value)
                        if(isIncorrectPin) setIsIncorrectPin(false)
                    }
                    } />
            </div>
            <button onClick={handlePrivacyFolderPinSet}>OK</button>
            {isIncorrectPin && <p style={{textAlign:'center'}}>unmatched pins try again</p>}
            {successPinSet && <p style={{textAlign:'center'}}>Pin Created Successfully</p>}
            </div>}
        </div>
    )
}
export default FolderPrivacy;