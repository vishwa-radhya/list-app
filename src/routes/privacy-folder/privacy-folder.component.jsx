import './privacy-folder.styles.css';
import Dialpad from '../../components-3/dialpad/dialpad.component';
import { Fragment, useEffect, useRef, useState } from 'react';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import privacyImg from '../../assets/secure-items.png';
import InputAndBtn from '../../components-3/input-and-btn/Input-and-btn.component';
import ShoppingList from '../../components-1/shopping-list/shopping-list.component';

const PrivacyFolder=()=>{

    const [isVerified,setIsVerified]=useState(false);
    const privacyFolderComponentsRef = useRef(null);

    const handleSetIsVerified=(bool)=>{
        setIsVerified(bool);
    }

    useEffect(()=>{
        if(privacyFolderComponentsRef.current){
            privacyFolderComponentsRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void privacyFolderComponentsRef.current.offsetWidth;
            privacyFolderComponentsRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[isVerified])

    return(
        <Fragment>
        {!isVerified ? <div className='privacy-folder-div animate__animated animate__fadeIn'>
            <p>Enter your 4 digit PIN</p>
            <Dialpad  handleSetIsVerified={handleSetIsVerified} />
        </div>
            :
        <div className='privacy-folder-components animate__animated animate__fadeIn' ref={privacyFolderComponentsRef}>
                <SvgWithLoader svgimg={privacyImg} svgWidth={170}  />
                <InputAndBtn placeHolder={'Enter Privacy Items'} buttonText={'Add To Privacy Folder'} pushAsFav={false} dbReference={'additionalInfo/privacyFolder'} />
                <ShoppingList isFavItemsOnly={false} dbReference={'additionalInfo/privacyFolder'} isFavOptionRequired={false} />
        </div>}
        </Fragment>
    )
}
export default PrivacyFolder;