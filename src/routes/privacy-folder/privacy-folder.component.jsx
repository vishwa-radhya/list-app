import './privacy-folder.styles.css';
import Dialpad from '../../components-3/dialpad/dialpad.component';
import { Fragment, useState } from 'react';

const PrivacyFolder=()=>{

    const [isVerified,setIsVerified]=useState(false);
    
    const handleSetIsVerified=(bool)=>{
        setIsVerified(bool);
    }

    return(
        <Fragment>
        {!isVerified ? <div className='privacy-folder-div'>
            <p>Enter your 4 digit PIN</p>
            <Dialpad  handleSetIsVerified={handleSetIsVerified} />
        </div>
            :
        <p>enter</p>}
        </Fragment>
    )
}
export default PrivacyFolder;