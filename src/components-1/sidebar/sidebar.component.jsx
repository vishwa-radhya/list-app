import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import { auth } from "../../utils/firebase";
import SetFolderDialog from '../../components-2/set-folder-dialog/set-folder-dialog.component';
import { database } from "../../utils/firebase";
import { ref,onValue } from 'firebase/database';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { SideBarContext } from '../../contexts/side-bar-context';
import DeleteDialog from '../../components-2/delete-dialog/delete-dialog.component';
import RenameFolderDialog from '../../components-2/rename-folder-dialog/rename-folder-dialog.component';
import Loader from '../../components-3/loader/loader.component';
import { PiFolderLockFill } from 'react-icons/pi';
import { FaRegPaperPlane,FaBars,FaHouse,FaStar,FaFolderPlus,FaFolder,FaRegTrashCan,FaRegPenToSquare,FaFileLines} from 'react-icons/fa6';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { BsStars } from 'react-icons/bs';
import { RiFolderSettingsLine } from 'react-icons/ri';


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
    const [isFoldersLoaded,setIsFoldersLoaded]=useState(true);

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
                
                const data = snapshot.val();
                if(data){
                const folderNamesFromDbArr = Object.entries(data).map(([key,val])=>({key:key,val:val}));                
                handleFolderNamesAdd(folderNamesFromDbArr);
                }else{
                    handleFolderNamesAdd([]);
                }
                setIsFoldersLoaded(false);
            })
            
        }
    },[user,handleFolderNamesAdd])

    function handleOpenCreateFolderDialog(bool){
        setIsCreateFolderDialogOpen(bool);
    }

    function handleFolderRouting(folder,e){
        if(showPopup){
            e.preventDefault();
        }else{
            navigateRouter(`folders/${folder?.key}`,{state:folder})    
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

    return(
        <Fragment>
            <div className="side-bar" style={sideBarStyles} ref={sideBarRef}>
            {isSideBarItemsHidden && <div className='side-bar-items-div'>
               <Link to='/'> <div className='side-bar-items side-bar-home' onClick={()=>handleSetIsSideBarOpen(false)}><FaHouse className="sb-i"></FaHouse>Home</div></Link>
               <Link to='/fav'> <div className='side-bar-items' onClick={()=>handleSetIsSideBarOpen(false)}><FaStar className="sb-i" style={{color:'#CCB142'}} ></FaStar>Selected</div></Link>
               <hr />
               <div className='side-bar-items add-folders-btn' ref={createFolderButtonRef} onClick={
                ()=>{
                    handleOpenCreateFolderDialog(true)}
            }><FaFolderPlus className='sb-i'></FaFolderPlus>Create Folder</div>
            <div className='sidebar-folders-div' onScroll={handleFolderDivScroll}>
            {isFoldersLoaded && <Loader/>}
               {
                folderNames.map((folder,index)=>{
                    return <div key={index} className='side-bar-items' onClick={(e)=>handleFolderRouting(folder,e)} onMouseDown={handleFolderMouseDown} onMouseUp={handleFolderMouseUp} onTouchStart={handleFolderMouseDown} onTouchEnd={handleFolderMouseLeave}>{folder?.val?.folderInstanceType ? <FaFileLines className='sb-i' /> : <FaFolder className='sb-i'/>} {folder?.key}</div>
                })
            }
            </div>
             <div className='sidebar-user-div'>
                <RiFolderSettingsLine className='fa-folder'
                    onClick={()=>{
                    navigateRouter('/folders-org') 
                    handleSetIsSideBarOpen(false)}}
                />
                <div className='feature-picker'>
                    <PiFolderLockFill className='feature-picker-tile' fontSize={'2px'}
                       onClick={()=>
                    {navigateRouter('/folder-privacy')
                        handleSetIsSideBarOpen(false)
                    }} 
                     />
                     <FaRegPaperPlane className='feature-picker-tile' style={{height:'20px'}} onClick={()=>
                    {navigateRouter('/item-transfer')
                        handleSetIsSideBarOpen(false)
                    }} />
                     <TiMicrophoneOutline className='feature-picker-tile' />
                     <BsStars className='feature-picker-tile' onClick={()=>
                    {navigateRouter('/ai-chat')
                        handleSetIsSideBarOpen(false)
                    }} />
                </div>
            </div>
               {showPopup && <div ref={popupRef} className='folder-options-div' style={{
                top:popupPosition.top-19,
                left:'85px',
               }}>
                <div onClick={()=>handleSetRenameFolderDialog(true)} ref={popupRenameButtonRef}><FaRegPenToSquare className='sb-i'></FaRegPenToSquare>Rename</div>
                <div onClick={()=>handleSetDeleteFolderDialog(true)} ref={popupDeleteButtonRef}><FaRegTrashCan className='sb-i'></FaRegTrashCan>Delete</div>
               </div>}
               </div>}
            </div>
            <div className='side-bar-toggle' ref={sideBarToggleRef}><FaBars className={'sb-t'} onClick={sideBarToggleHandler}></FaBars></div>
            { isCreateFolderDialogOpen && <SetFolderDialog setIsCreateFolderDialogOpen={setIsCreateFolderDialogOpen} isCreateFolderDialogOpen={isCreateFolderDialogOpen} ref={createFolderDialogRef} createFolderButtonRef={createFolderButtonRef} />}
             { isDeleteFolderDialogOpen && <DeleteDialog ref={deleteDialogRef} currentFolderName={currentFolderName} setShowPopup={setShowPopup} popupDeleteButtonRef={popupDeleteButtonRef}  />}
             {isRenameFolderDialogOpen && <RenameFolderDialog ref={renameDialogref} popupRenameButtonRef={popupRenameButtonRef} currentFolderName={currentFolderName} setShowPopup={setShowPopup} />}
        </Fragment>
    )
}
export default SideBar;