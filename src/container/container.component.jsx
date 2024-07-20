import Interactor from "../interactor/interactor.component";
import catImage from '../assets/cat.jpg';
import Loader from "../loader/loader.component";
import Dropdown from "../dropdown/Dropdown.component";
import { useState } from "react";
import { auth } from "../utils/firebase";
const Container=()=>{
    const [imgLoaded,setImgLoaded]=useState(true);
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const userImg = auth.currentUser.photoURL;
    const displayName = auth.currentUser.displayName;
    const userEmail = auth.currentUser.email;
    function imgLoadingHandler(){
        setImgLoaded(false);
    }
    function dropdrophandler(){
        setIsDropdownOpen(!isDropdownOpen);
    }
    
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div onClick={dropdrophandler}>{userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
            
                <img src={catImage} width={200} alt="shopping-cat" onLoad={imgLoadingHandler} />
            {imgLoaded ? <Loader/> : <Interactor/>}
            <Dropdown userImg={userImg} displayName={displayName} userEmail={userEmail} isDropdownOpen={isDropdownOpen} />
        </div>
    )
}
export default Container;