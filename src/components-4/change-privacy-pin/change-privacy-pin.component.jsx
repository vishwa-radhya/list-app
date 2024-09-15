import { Fragment, useContext, useState } from 'react';
import Dialpad from '../../components-3/dialpad/dialpad.component';
import './change-privacy-pin.styles.css';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import SetPrivacyPinForm from '../set-privacy-pin-from/set-privacy-pin-form.component';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyImage from '../../assets/secure-items.png';
import { useNavigate } from 'react-router-dom';

const ChangePrivacyPin=()=>{
    const {storedPrivacyPin}=useContext(AditionalInfoContext)
    const [isVerified,setIsVerified]=useState(false);
    const navigateRouter = useNavigate();
    const handleSetIsVerified=(bool)=>{
        setIsVerified(bool);
    }
    
    return(
        <Fragment>
        {storedPrivacyPin ? 
        <div className='change-pin-div animate__animated animate__fadeIn'>
            {!isVerified ? <Fragment>
                <p className='verify-p-tag'>Enter your 4 digit PIN</p>
                <Dialpad handleSetIsVerified={handleSetIsVerified} />
            </Fragment>
            :
            <Fragment>
                <SetPrivacyPinForm isPrivacyPinSetRequired={true} />
            </Fragment>
            }
        </div > : <div className='no-privacy-pin-indicator-div'>
            <SvgWithLoader svgimg={PrivacyImage} svgWidth={170}  />
            <p>You do not have any privacy folder yet</p>
            <button onClick={()=>navigateRouter('/folder-privacy')}>Privacy Folders</button>
        </div>}
        </Fragment>
    )
}
export default ChangePrivacyPin;