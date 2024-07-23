import Interactor from "../interactor/interactor.component";
import catImage from '../assets/cat.jpg';
import Loader from "../loader/loader.component";
import Dropdown from "../dropdown/Dropdown.component";
import { useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import './container.styles.css';
const Container=()=>{
    const [imgLoaded,setImgLoaded]=useState(true);
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const dropdownRef = useRef(null);
    const userImgRef = useRef(null);
    const userImg = auth.currentUser.photoURL;
    const displayName = auth.currentUser.displayName;
    const userEmail = auth.currentUser.email;

    function handleClickOutside(event){
        if(dropdownRef.current && !dropdownRef.current.contains(event.target) && !userImgRef.current.contains(event.target)){
            setIsDropdownOpen(false);
        }
    }

    useEffect(()=>{
        if(isDropdownOpen){
            document.addEventListener('click',handleClickOutside);
        }else{
            document.removeEventListener('click',handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('click',handleClickOutside);
        }
    },[isDropdownOpen]);

    function imgLoadingHandler(){
        setImgLoaded(false);
    }
    function dropdrophandler(){
        setIsDropdownOpen(!isDropdownOpen);
    }
    
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div onClick={dropdrophandler} ref={userImgRef}>{userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
            
                <img src={catImage} width={200} alt="shopping-cat" onLoad={imgLoadingHandler} />
            {imgLoaded ? <Loader/> : <Interactor/>}
            <div ref={dropdownRef}>
            <Dropdown userImg={userImg} displayName={displayName} userEmail={userEmail} isDropdownOpen={isDropdownOpen} />
            </div>
        </div>
    )
}
export default Container;