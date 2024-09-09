import { useState } from 'react';
import './svg-with-loader.styles.css'
import Loader from '../loader/loader.component';
import PropTypes from 'prop-types';
const SvgWithLoader = ({svgimg,svgWidth=160})=>{

    const [isImgLoaded,setIsImgLoaded]=useState(false);


    return(
        <div className='svg-with-loader-div'>
        {!isImgLoaded && <Loader/>}
        <img src={svgimg} alt="" width={svgWidth} onLoad={()=>setIsImgLoaded(true)} />
        </div>
    )
}
SvgWithLoader.propTypes={
    svgimg:PropTypes.string,
    svgWidth:PropTypes.number,
}
export default SvgWithLoader;