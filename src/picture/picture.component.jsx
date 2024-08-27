import { Fragment, useState } from 'react';
import ImgLoaderForPicture from '../img-loader/img-loader-pict.component';
import PropTypes from 'prop-types';
const Picture=({catImage,pictureWidth})=>{

    const [imgLoaded,setImgLoaded]=useState(false);

    // console.log('render picture');
    return(
        <Fragment>
        {!imgLoaded && <ImgLoaderForPicture/> }
        <img src={catImage} width={pictureWidth} alt="shopping-cat" onLoad={()=>setImgLoaded(true)} /> 
        </Fragment>
    )
}
Picture.propTypes={
    catImage:PropTypes.string,
    pictureWidth:PropTypes.number,
}
export default Picture;