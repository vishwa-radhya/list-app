import Dropdown from "../dropdown/Dropdown.component";
import {   useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import { Route, Routes } from 'react-router-dom';
import './container.styles.css';
import Home from '../routes/home/home.component';
import Favorites from '../routes/favorites/favorites.component';
import SideBar from '../sidebar/sidebar.component';
import FolderComponent from '../routes/folder/folder.component';

const Container=()=>{
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

    
    function dropdrophandler(){
        setIsDropdownOpen(!isDropdownOpen);
    }

    

    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div onClick={dropdrophandler} ref={userImgRef}>{userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='fav' element={<Favorites/>} />
                    <Route path='folders/:folderName' element={<FolderComponent/>}/>
                </Routes>
            <div ref={dropdownRef}>
            <Dropdown userImg={userImg} displayName={displayName} userEmail={userEmail} isDropdownOpen={isDropdownOpen} />
            </div>
            <SideBar/>
        </div>
    )
}
export default Container;