import './folder-privacy.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import PrivacyItems from '../../assets/secure-items.png';
import { useEffect, useRef } from 'react';

const FolderPrivacy=()=>{

    const folderPrivacyDivRef = useRef(null); 

    useEffect(()=>{
        if(folderPrivacyDivRef.current){
            folderPrivacyDivRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void folderPrivacyDivRef.current.offsetWidth;
            folderPrivacyDivRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[])

    return(
        <div className="folder-privacy-div animate__animated animate__fadeIn" ref={folderPrivacyDivRef}>
            <SvgWithLoader svgimg={PrivacyItems}  />
        </div>
    )
}
export default FolderPrivacy;