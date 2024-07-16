import Interactor from "./interactor";
import catImage from './assets/cat.jpg';
import Loader from "./loader";
import { useState } from "react";
const Container=()=>{
    const [imgLoaded,setImgLoaded]=useState(true);

    function imgLoadingHandler(){
        setImgLoaded(false);
    }

    return(
        <div className="container">
            {imgLoaded && <Loader/>}
            <img src={catImage} width={200} alt="shopping-cat" onLoad={imgLoadingHandler} />
            <Interactor/>
        </div>
    )
}
export default Container;