import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import { useContext, useState } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { useNavigate } from 'react-router-dom';
import SetPrivacyPinForm from '../../components-4/set-privacy-pin-from/set-privacy-pin-form.component';

const FolderPrivacy=()=>{

    const [isGetStartedSelected,setIsGetStartedSelected]=useState(false);
    const {storedPrivacyPin}=useContext(AditionalInfoContext);
    const navigateRouter = useNavigate();
    
    return(
        <div className="folder-privacy-div animate__animated animate__fadeIn" >
            <SvgWithLoader svgimg={PrivacyItems}  />
            <p style={{fontWeight:'550'}}>Privacy Folders</p>
            {!storedPrivacyPin ? <button onClick={()=>setIsGetStartedSelected(true)}>Get Started</button>
            : <button onClick={()=>navigateRouter('/privacy-folder')}>Open Privacy Folder</button>}
            {isGetStartedSelected && !storedPrivacyPin && <SetPrivacyPinForm isPrivacyPinSetRequired={false} />}
        </div>
    )
}
export default FolderPrivacy;