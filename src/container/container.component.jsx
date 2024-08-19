import { auth } from "../utils/firebase";
import { Route, Routes,useNavigate } from 'react-router-dom';
import './container.styles.css';
import Home from '../routes/home/home.component';
import Favorites from '../routes/favorites/favorites.component';
import SideBar from '../sidebar/sidebar.component';
import FolderComponent from '../routes/folder/folder.component';
import Settings from "../routes/settings/settings.component";
import About from "../routes/about/about.component";

const Container=()=>{
    const navigateRouter = useNavigate();
    const userImg = auth.currentUser.photoURL;
    // console.log('render container');
    return(
        <div className="container">
        <div className="s-out-pic-container">
        <div onClick={()=>navigateRouter('/settings')}>
        {userImg && <img src={userImg} alt="" width={25}></img> }</div>
        </div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='fav' element={<Favorites/>} />
                    <Route path='folders/:folderName' element={<FolderComponent/>}/>
                    <Route path="settings" element={<Settings/>} />
                    <Route path="about" element={<About/>}/>
                </Routes>
            <SideBar/>
        </div>
    )
}
export default Container;