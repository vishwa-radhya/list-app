import './privacy-folder.styles.css';
import Dialpad from '../../components-3/dialpad/dialpad.component';
import { Fragment, useEffect, useRef, useState } from 'react';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import privacyImg from '../../assets/secure-items.png';
import invoiceImg from '../../assets/invoice-bill-svgrepo-com.svg';
import InputAndBtn from '../../components-3/input-and-btn/Input-and-btn.component';
import ShoppingList from '../../components-1/shopping-list/shopping-list.component';
import { useLocation } from 'react-router-dom';
import InvoiceInputBtn from '../../components-3/invoice-input-btn/invoice-input-btn.component';
import InvoiceList from '../../components-1/invoice-list/invoice-list.component';

const PrivacyFolder=()=>{

    const [isVerified,setIsVerified]=useState(false);
    const privacyFolderComponentsRef = useRef(null);
    const location = useLocation();
    const renderPrivacyInvoice = location.state

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
                <SvgWithLoader svgimg={!renderPrivacyInvoice ? privacyImg : invoiceImg} svgWidth={!renderPrivacyInvoice ? 170 :110}  />
                {!renderPrivacyInvoice ?
                    <InputAndBtn placeHolder={'Enter Privacy Items'} buttonText={'Add To Privacy Folder'} pushAsFav={false} dbReference={'additionalInfo/privacyFolder'} /> : <InvoiceInputBtn placeHolder={'Enter Items'} buttonText={'Add To Invoice'} dbReference={`additionalInfo/privacyInvoice`} />
                }
                {!renderPrivacyInvoice ?
                <ShoppingList isFavItemsOnly={false} dbReference={'additionalInfo/privacyFolder'} isFavOptionRequired={false} /> : <InvoiceList dbReference={'additionalInfo/privacyInvoice'} />
                }
        </div>}
        </Fragment>
    )
}
export default PrivacyFolder;