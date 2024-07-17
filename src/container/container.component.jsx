import Interactor from "../interactor/interactor.component";
import catImage from '../assets/cat.jpg';
import Loader from "../loader/loader.component";
import { useState } from "react";
import { signOutUser,auth } from "../utils/firebase";
const Container=()=>{
    const [imgLoaded,setImgLoaded]=useState(true);
    const userImg = auth.currentUser.photoURL;
    function imgLoadingHandler(){
        setImgLoaded(false);
    }
    async function handleSignOutUser(){
        await signOutUser();
    }
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <p onClick={handleSignOutUser}>Sign Out</p>
        <div>{userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
            
                <img src={catImage} width={200} alt="shopping-cat" onLoad={imgLoadingHandler} />
            {imgLoaded ? <Loader/> : <Interactor/>}
        </div>
    )
}
export default Container;