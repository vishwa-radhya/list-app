import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import './extra-features.styles.css'
import ImageForAi from '../../assets/image-for-ai.png';
import ImageForTransfer from '../../assets/image-for-transfer.png';
import ImageForPrivacy from '../../assets/image-for-privacy.png';
import ImageForVoice from '../../assets/image-for-voice.png';
import PropTypes from 'prop-types';
import {  useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ExtraFeatures=({addonsDivRef,isExtraFeaturesOpen,setIsExtraFeaturesOpen})=>{

    const navigateRouter = useNavigate();
    const featureDivRef = useRef(null);
    
    useEffect(()=>{
        if(isExtraFeaturesOpen){
            const handleClickOutSide=(event)=>{
                if(featureDivRef.current && !featureDivRef.current.contains(event.target) && addonsDivRef.current && !addonsDivRef.current.contains(event.target)){
                    setIsExtraFeaturesOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutSide)
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[isExtraFeaturesOpen,addonsDivRef,setIsExtraFeaturesOpen])
    
    return(
        <div className='extra-features-div animate__animated animate__zoomIn' ref={featureDivRef}>
        <div className='feature-tile' 
        onClick={
            ()=>{
                setIsExtraFeaturesOpen(false)
                navigateRouter('/folder-privacy')}
            }>
        <SvgWithLoader svgimg={ImageForPrivacy} svgWidth={45} />
        <span>Privacy Folder</span>
        </div>
        <div className='feature-tile'>
        <SvgWithLoader svgimg={ImageForTransfer} svgWidth={58} />
        <span>Item Transfer</span>
        </div>
        <div className='feature-tile'>
        <SvgWithLoader svgimg={ImageForVoice} svgWidth={52} />
        <span>Voice Access</span>
        </div>
        <div className='feature-tile'>
        <SvgWithLoader svgimg={ImageForAi} svgWidth={45} />
        <span>???</span>
        </div>
        </div>
    )
}
ExtraFeatures.propTypes={
    addonsDivRef:PropTypes.shape({
        current:PropTypes.instanceOf(Element)
    }),
    isExtraFeaturesOpen:PropTypes.bool,
    setIsExtraFeaturesOpen:PropTypes.func,
}
export default ExtraFeatures;