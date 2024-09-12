import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import Dialpad from '../../components-3/dialpad/dialpad.component';

const FolderPrivacy=()=>{


    return(
        <div className="folder-privacy-div animate__animated animate__fadeIn" >
            <SvgWithLoader svgimg={PrivacyItems}  />
            <p style={{fontWeight:'550'}}>Privacy Folders</p>
            <Dialpad/>
        </div>
    )
}
export default FolderPrivacy;