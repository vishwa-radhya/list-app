import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import { auth } from "../utils/firebase";
import SetFolderDialog from '../set-folder-dialog/set-folder-dialog.component';
import { database } from "../utils/firebase";
import { ref,onValue } from 'firebase/database';
import { FolderNamesContext } from '../contexts/folder-names-context';
import { SideBarContext } from '../contexts/side-bar-context';
import DeleteDialog from '../delete-dialog/delete-dialog.component';
import RenameFolderDialog from '../rename-folder-dialog/rename-folder-dialog.component';

const SideBar=()=>{
    const sideBarRef = useRef(null);
    const sideBarToggleRef = useRef(null);
    const createFolderDialogRef=useRef(null);
    const [isCreateFolderDialogOpen,setIsCreateFolderDialogOpen]=useState(false);
    const {handleSetDeleteFolderDialog,folderNames,handleFolderNamesAdd,isDeleteFolderDialogOpen,isRenameFolderDialogOpen,handleSetRenameFolderDialog,currentFolderName,handleSetCurrentFolderName}=useContext(FolderNamesContext);
    const {isSideBarOpen,handleSetIsSideBarOpen} = useContext(SideBarContext);
    const [showPopup,setShowPopup]=useState(false);
    const [popupPosition,setPopupPosition]=useState({top:0});
    const timeoutRef = useRef(null);
    const hideSideBarItemsTimeoutRef = useRef(null);
    const navigateRouter = useNavigate();
    const popupRef = useRef(null);
    const deleteDialogRef =useRef(null);
    const renameDialogref = useRef(null);
    const createFolderButtonRef =useRef(null);
    const popupRenameButtonRef = useRef(null);
    const popupDeleteButtonRef = useRef(null);
    const [isSideBarItemsHidden,setIsSideBarItemsHidden]=useState(false);
    const [isScrolling,setIsScrolling]=useState(false);

    useEffect(()=>{
        if(isSideBarOpen){
        hideSideBarItemsTimeoutRef.current = setTimeout(()=>{
            setIsSideBarItemsHidden(isSideBarOpen);
        },300)
    }else{
        setIsSideBarItemsHidden(isSideBarOpen);
    }
        return ()=>{
            clearTimeout(hideSideBarItemsTimeoutRef);            
        }
    },[isSideBarOpen]);
    
    const sideBarStyles={
        width: isSideBarOpen ? '310px' : '0',
    }
    

    const user=auth.currentUser;
    const userImg = auth.currentUser?.photoURL;
    const displayName = auth.currentUser?.displayName;
    
    function sideBarToggleHandler(){
        handleSetIsSideBarOpen(!isSideBarOpen);
    }
    
    
    useEffect(()=>{
        if(isSideBarOpen){
            const handleSideBarOutSideClick=(event)=>{
                if(sideBarRef.current && !sideBarRef.current.contains(event.target) && !sideBarToggleRef.current.contains(event.target)){                        
                    handleSetIsSideBarOpen(false);
                    setIsCreateFolderDialogOpen(false);
                    handleSetDeleteFolderDialog(false);
                    handleSetRenameFolderDialog(false);
                }
            }
            document.addEventListener('click',handleSideBarOutSideClick);
            return ()=>{
                document.removeEventListener('click',handleSideBarOutSideClick);
            }
        }

    },[isSideBarOpen,handleSetDeleteFolderDialog,handleSetRenameFolderDialog,handleSetIsSideBarOpen]);
    
    useEffect(()=>{
        if(showPopup){
            const handleClickOutSide=(event)=>{
                if(popupRef.current && !popupRef.current.contains(event.target) && (!deleteDialogRef.current || !deleteDialogRef.current.contains(event.target)) && (!renameDialogref.current || !renameDialogref.current.contains(event.target))){
                    setShowPopup(false);
                    handleSetDeleteFolderDialog(false)
                    handleSetRenameFolderDialog(false);
                }
            }
            document.addEventListener('mousedown',handleClickOutSide);
            document.addEventListener('touchstart',handleClickOutSide);

            return ()=>{
                document.removeEventListener('mousedown',handleClickOutSide);
                document.removeEventListener('touchstart',handleClickOutSide);
            }
        }
    },[showPopup,handleSetDeleteFolderDialog,handleSetRenameFolderDialog])

    useEffect(()=>{
        if(user){
            const dbFolderReference = ref(database,`shoppingLists/${user.uid}/folders`)
            onValue(dbFolderReference,(snapshot)=>{
                // console.log('hit from folders match');
                
                const data = snapshot.val();
                if(data){
                const folderNamesFromDbArr = Object.keys(data);                
                handleFolderNamesAdd(folderNamesFromDbArr);
                }else{
                    handleFolderNamesAdd([]);
                }
            })
        }
    },[user,handleFolderNamesAdd])

    function handleOpenCreateFolderDialog(bool){
        setIsCreateFolderDialogOpen(bool);
    }

    function handleFolderRouting(folderName,e){
        if(showPopup){
            e.preventDefault();
        }else{
            navigateRouter(`folders/${folderName}`)    
            handleSetIsSideBarOpen(false);
        }
    }
    
    function handleFolderMouseDown(event){   
        if(isScrolling) return;             
        const rect = event.target.getBoundingClientRect();
        handleSetCurrentFolderName(event.target.textContent);
        setPopupPosition({top:rect.bottom});
        timeoutRef.current = setTimeout(()=>{
            setShowPopup(true);
        },600);        
    }

    const handleFolderDivScroll=()=>{
        setIsScrolling(true);
        clearTimeout(timeoutRef.current);
    }
    function handleFolderMouseUp(){
        clearTimeout(timeoutRef.current);
    }

    function handleFolderMouseLeave(){
        clearTimeout(timeoutRef.current);  
        setIsScrolling(false);
    }

    function handleSettingsRouting(){
        navigateRouter('/settings');
        handleSetIsSideBarOpen(false);
    }
    // console.log('render sidebar');
    return(
        <Fragment>
            <div className="side-bar" style={sideBarStyles} ref={sideBarRef}>
            {isSideBarItemsHidden && <div className='side-bar-items-div'>
               <Link to='/'> <div className='side-bar-items side-bar-home' onClick={()=>handleSetIsSideBarOpen(false)}><i className="fa-solid fa-house"></i>Home</div></Link>
               <Link to='/fav'> <div className='side-bar-items' onClick={()=>handleSetIsSideBarOpen(false)}><i className="fa-solid fa-star" style={{color:'#CCB142'}} ></i>Selected</div></Link>
               <hr />
               <div className='side-bar-items add-folders-btn' ref={createFolderButtonRef} onClick={
                ()=>{
                    handleOpenCreateFolderDialog(true)}
            }><i className='fa-solid fa-folder-plus'></i>Create Folder</div>
            <div className='sidebar-folders-div' onScroll={handleFolderDivScroll}>
               {
                folderNames.map((folder,index)=>{
                    return <div key={index} className='side-bar-items' onClick={(e)=>handleFolderRouting(folder,e)} onMouseDown={handleFolderMouseDown} onMouseUp={handleFolderMouseUp} onTouchStart={handleFolderMouseDown} onTouchEnd={handleFolderMouseLeave}><i className='fa-solid fa-folder'></i>{folder}</div>
                })
            }
            </div>
             <div className='sidebar-user-div' onClick={handleSettingsRouting}>
                <div>
                    <img src={userImg} alt="user-image" width={35} />
                </div>
                <div className='p-div'>
                    <p>{displayName}</p>
                </div>
                <i className='fa-solid fa-ellipsis'></i>
            </div>
               {showPopup && <div ref={popupRef} className='folder-options-div' style={{
                top:popupPosition.top-19,
                left:'85px',
               }}>
                <div onClick={()=>handleSetRenameFolderDialog(true)} ref={popupRenameButtonRef}><i className='fa-regular fa-pen-to-square'></i>Rename</div>
                <div onClick={()=>handleSetDeleteFolderDialog(true)} ref={popupDeleteButtonRef}><i className='fa-regular fa-trash-can'></i>Delete</div>
               </div>}
               </div>}
            </div>
            <div className='side-bar-toggle' ref={sideBarToggleRef}><i className={isSideBarOpen ? '' : 'fa-solid fa-bars'} onClick={sideBarToggleHandler}></i></div>
            { isCreateFolderDialogOpen && <SetFolderDialog setIsCreateFolderDialogOpen={setIsCreateFolderDialogOpen} isCreateFolderDialogOpen={isCreateFolderDialogOpen} ref={createFolderDialogRef} createFolderButtonRef={createFolderButtonRef} />}
             { isDeleteFolderDialogOpen && <DeleteDialog ref={deleteDialogRef} currentFolderName={currentFolderName} setShowPopup={setShowPopup} popupDeleteButtonRef={popupDeleteButtonRef} />}
             {isRenameFolderDialogOpen && <RenameFolderDialog ref={renameDialogref} popupRenameButtonRef={popupRenameButtonRef} currentFolderName={currentFolderName} setShowPopup={setShowPopup} />}
        </Fragment>
    )
}
export default SideBar;