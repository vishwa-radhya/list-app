import { auth } from "../../utils/firebase";
import { Route, Routes,useNavigate } from 'react-router-dom';
import './container.styles.css';
import Home from '../../routes/home/home.component';
import Favorites from '../../routes/favorites/favorites.component';
import SideBar from '../sidebar/sidebar.component';
import FolderComponent from '../../routes/folder/folder.component';
import Settings from "../../routes/settings/settings.component";
import About from "../../routes/about/about.component";
import FolderInfo from "../../routes/folder-info/folder-info.component";
import FoldersOrg from "../../routes/folders-org/folders-org.componenet";
import {   useEffect, useRef, useState } from "react";
import FolderPrivacy from "../../routes/folder-privacy/folder-privacy.component";
import PrivacyFolder from "../../routes/privacy-folder/privacy-folder.component";
import ExtraFeatures from "../../components-4/extra-features/extra-features.componenet";
import ChangePrivacyPin from "../../components-4/change-privacy-pin/change-privacy-pin.component";

const Container=()=>{
    const navigateRouter = useNavigate();
    const userImg = auth.currentUser?.photoURL;
    const [isExtraFeaturesOpen,setIsExtraFeaturesOpen]=useState(false);
    const addonsDivRef = useRef(null);

    useEffect(()=>{        
        const routePath = localStorage.getItem('landingRoute');
        if(routePath && routePath !== '/'){    
            navigateRouter(routePath);
        }
    },[])
    
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div className="addons-div" onClick={()=>setIsExtraFeaturesOpen(true)} ref={addonsDivRef}>
            <i className="fa-solid fa-shapes"></i>
        </div>
        <div onClick={()=>navigateRouter('/settings')}>
        {userImg && <img src={userImg} alt="." width={25}></img> }</div>
        </div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='fav' element={<Favorites/>} />
                    <Route path='folders/:folderName' element={<FolderComponent/>}/>
                    <Route path="settings" element={<Settings/>} />
                    <Route path="about" element={<About/>}/>
                    <Route path="folders/:folderName/info" element={<FolderInfo/>} />
                    <Route path="folders-org" element={<FoldersOrg/>} />
                    <Route path="folder-privacy" element={<FolderPrivacy/>} />
                    <Route path="privacy-folder" element={<PrivacyFolder/>} />
                    <Route path="change-privacy-pin" element={<ChangePrivacyPin/>} />
                </Routes>
            <SideBar  />
             {isExtraFeaturesOpen && <ExtraFeatures addonsDivRef={addonsDivRef} isExtraFeaturesOpen={isExtraFeaturesOpen} setIsExtraFeaturesOpen={setIsExtraFeaturesOpen} />}
        </div>
    )
}
export default Container;