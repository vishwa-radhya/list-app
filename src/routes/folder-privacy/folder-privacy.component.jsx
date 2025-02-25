import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import { useContext, useState } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { useNavigate } from 'react-router-dom';
import SetPrivacyPinForm from '../../components-4/set-privacy-pin-from/set-privacy-pin-form.component';

const FolderPrivacy = () => {
    const [isGetStartedSelected, setIsGetStartedSelected] = useState(false);
    const { storedPrivacyPin } = useContext(AditionalInfoContext);
    const navigateRouter = useNavigate();
    
    return (
        <div className="folder-privacy-div animate__animated animate__fadeIn">
            <div className="privacy-content">
                <SvgWithLoader svgimg={PrivacyItems} />
                <h1 className="privacy-title">Privacy Folders</h1>
                <p className="privacy-description">
                    Secure your sensitive files with password protection. 
                    Create a private space for your confidential documents.
                </p>
                <div className="privacy-features">
                    <div className="feature">
                        <span className="feature-icon">🔒</span>
                        <span>Password Protected</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🗄️</span>
                        <span>Organized Storage</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🔐</span>
                        <span>Easy Access</span>
                    </div>
                </div>
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
                            className="privacy-button"
                            onClick={() => navigateRouter('/privacy-folder')}
                        >
                            Open Privacy Folder
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