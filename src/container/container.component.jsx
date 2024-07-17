import Interactor from "../interactor/interactor.component";
import catImage from '../assets/cat.jpg';
import Loader from "../loader/loader.component";
import { useState } from "react";
const Container=()=>{
    const [imgLoaded,setImgLoaded]=useState(true);

    function imgLoadingHandler(){
        setImgLoaded(false);
    }

    return(
        <div className="container">
                <img src={catImage} width={200} alt="shopping-cat" onLoad={imgLoadingHandler} />
            {imgLoaded ? <Loader/> : <Interactor/>}
        </div>
    )
}
export default Container;