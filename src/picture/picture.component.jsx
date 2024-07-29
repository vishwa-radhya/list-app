import { Fragment, useState } from 'react';
import Loader from "../loader/loader.component";
import PropTypes from 'prop-types';
const Picture=({catImage,pictureWidth})=>{

    const [imgLoaded,setImgLoaded]=useState(true);

    function imgLoadingHandler(){
        setImgLoaded(false);
    }

    return(
        <Fragment>
        {imgLoaded && <Loader/> }
        <img src={catImage} width={pictureWidth} alt="shopping-cat" onLoad={imgLoadingHandler} />
        </Fragment>
    )
}
Picture.propTypes={
    catImage:PropTypes.string,
    pictureWidth:PropTypes.number,
}
export default Picture;