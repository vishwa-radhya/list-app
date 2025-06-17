import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import { useContext, useState } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import SetPrivacyPinForm from '../../components-4/set-privacy-pin-from/set-privacy-pin-form.component';
import InvoiceItems from '../../assets/invoice-bill-svgrepo-com.svg'

const FolderPrivacy = () => {
    const [isGetStartedSelected, setIsGetStartedSelected] = useState(false);
    const { storedPrivacyPin } = useContext(AditionalInfoContext);
    const navigateRouter = useNavigate();
    const location = useLocation();
    const renderPrivacyInvoice = location?.state === 'privacy-invoice'
    
    return (
        <div className="folder-privacy-div animate__animated animate__fadeIn">
            <div className="privacy-content">
                <SvgWithLoader svgimg={!renderPrivacyInvoice ? PrivacyItems : InvoiceItems} svgWidth={renderPrivacyInvoice ? 120 : 160} />
                <h1 className="privacy-title">Privacy {!renderPrivacyInvoice ? "Folders" : 'Invoices'}</h1>
                <p className="privacy-description">
                    Secure your sensitive data with password protection. 
                    Create a private space for your confidential content.
                </p>
                <div className="privacy-actions">
                    {!storedPrivacyPin ? (
                        <button 
                            className="privacy-button"
                            onClick={() => setIsGetStartedSelected(true)}
                        >
                            Get Started
                        </button>
                    ) : (
                        <button 
                            className={`privacy-button ${renderPrivacyInvoice ? 'invoice-type' : ''}`}
                            onClick={() => navigateRouter('/privacy-folder',{state:renderPrivacyInvoice})}
                        >
                            Open Privacy {!renderPrivacyInvoice ? "Folder" : "Invoice"}
                        </button>
                    )}
                </div>
                {isGetStartedSelected && !storedPrivacyPin && (
                    <SetPrivacyPinForm isPrivacyPinSetRequired={false} />
                )}
            </div>
        </div>
    );
};

export default FolderPrivacy;