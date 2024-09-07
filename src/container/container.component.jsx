import { auth } from "../utils/firebase";
import { Route, Routes,useNavigate } from 'react-router-dom';
import './container.styles.css';
import Home from '../routes/home/home.component';
import Favorites from '../routes/favorites/favorites.component';
import SideBar from '../sidebar/sidebar.component';
import FolderComponent from '../routes/folder/folder.component';
import Settings from "../routes/settings/settings.component";
import About from "../routes/about/about.component";
import FolderInfo from "../routes/folder-info/folder-info.component";
import FoldersOrg from "../components-2/folders-org/folders-org.componenet";
import {  useEffect } from "react";

const Container=()=>{
    const navigateRouter = useNavigate();
    const userImg = auth.currentUser?.photoURL;
    
    useEffect(()=>{        
        const routePath = localStorage.getItem('landingRoute');
        if(routePath && routePath !== '/'){    
            navigateRouter(routePath);
        }
    },[])

    
    return(
        <div className="container">
        <div className="s-out-pic-container">
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
                </Routes>
            <SideBar/>
        </div>
    )
}
export default Container;