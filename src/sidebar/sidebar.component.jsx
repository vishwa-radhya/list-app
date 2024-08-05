import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import SetFolderDialog from '../set-folder-dialog/set-folder-dialog.component';
import { FolderNamesContext } from '../contexts/folder-names-context';

const SideBar=()=>{
    const [isSideBarOpen,setIsSideBarOpen]=useState(false);
    const sideBarRef = useRef(null);
    const sideBarToggleRef = useRef(null);
    const createFolderDialogRef=useRef(null);
    const [isCreateFolderDialogOpen,setIsCreateFolderDialogOpen]=useState(false);
    const {folderNames}=useContext(FolderNamesContext);

    const navigateRouter = useNavigate();

    const sideBarStyles={
        width: isSideBarOpen ? '135px' : '0',
        padding : isSideBarOpen ? '10px 10px' : '0',
    }

    

    function sideBarToggleHandler(){
        setIsSideBarOpen(!isSideBarOpen);
    }

    function handleSideBarOutSideClick(event){
        if(sideBarRef.current && !sideBarRef.current.contains(event.target) && !sideBarToggleRef.current.contains(event.target) && createFolderDialogRef && !createFolderDialogRef.current.contains(event.target)){
            setIsSideBarOpen(false);
            setIsCreateFolderDialogOpen(false);
        }
    }
    useEffect(()=>{
        if(isSideBarOpen){
            document.addEventListener('click',handleSideBarOutSideClick);
        }else{
            document.removeEventListener('click',handleSideBarOutSideClick);
        }
        return ()=>{
            document.removeEventListener('click',handleSideBarOutSideClick);
        }

    },[isSideBarOpen]);

    function handleOpenCreateFolderDialog(bool){
        setIsCreateFolderDialogOpen(bool);
    }

    function handleFolderRouting(folderName){
        navigateRouter(`folders/${folderName}`)
    }

    return(
        <Fragment>
            <div className="side-bar" style={sideBarStyles} ref={sideBarRef}>
               <Link to='/'> <div className='side-bar-items side-bar-home'><i className="fa-solid fa-house"></i>Home</div></Link>
               <Link to='/fav'> <div className='side-bar-items'><i className="fa-solid fa-star" style={{color:'gold'}}></i>Favorites</div></Link>
               <hr />
               <div className='side-bar-items add-folders-btn' onClick={()=>handleOpenCreateFolderDialog(true)}><i className='fa-solid fa-folder-plus'></i></div>
               {
                folderNames.map((folder,index)=>{
                    return <div key={index} className='side-bar-items' onClick={()=>handleFolderRouting(folder)}><i className='fa-solid fa-folder'></i>{folder}</div>
                })
               }
            </div>
            <div className='side-bar-toggle' ref={sideBarToggleRef}><i className={isSideBarOpen ? '' : 'fa-solid fa-bars'} onClick={sideBarToggleHandler}></i></div>
            <SetFolderDialog setIsCreateFolderDialogOpen={setIsCreateFolderDialogOpen} ref={createFolderDialogRef} isCreateFolderDialogOpen={isCreateFolderDialogOpen} />
        </Fragment>
    )
}
export default SideBar;