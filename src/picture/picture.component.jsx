import { Fragment, useEffect, useState } from 'react';
import ImgLoaderForPicture from '../img-loader/img-loader-pict.component';
import PropTypes from 'prop-types';
const Picture=({catImage,pictureWidth})=>{

    const [imgLoaded,setImgLoaded]=useState(false);

    useEffect(()=>{
        const img = new Image();
        img.src = catImage;
        img.onload=()=>setImgLoaded(true);
    },[catImage]);
    // console.log('render picture');
    return(
        <Fragment>
         {!imgLoaded && <ImgLoaderForPicture/> }
        <img src={catImage} width={pictureWidth} alt="shopping-cat" style={{display:imgLoaded ? 'block' : 'none'}}  /> 
        </Fragment>
    )
}
Picture.propTypes={
    catImage:PropTypes.string,
    pictureWidth:PropTypes.number,
}
export default Picture;