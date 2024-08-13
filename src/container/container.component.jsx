import { auth } from "../utils/firebase";
import { Route, Routes } from 'react-router-dom';
import './container.styles.css';
import Home from '../routes/home/home.component';
import Favorites from '../routes/favorites/favorites.component';
import SideBar from '../sidebar/sidebar.component';
import FolderComponent from '../routes/folder/folder.component';
import Settings from "../routes/settings/settings.component";

const Container=()=>{

    const userImg = auth.currentUser.photoURL;
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div >{userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='fav' element={<Favorites/>} />
                    <Route path='folders/:folderName' element={<FolderComponent/>}/>
                    <Route path="settings" element={<Settings/>} />
                </Routes>
            <SideBar/>
        </div>
    )
}
export default Container;