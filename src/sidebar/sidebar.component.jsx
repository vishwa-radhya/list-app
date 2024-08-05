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
    const [showPopup,setShowPopup]=useState(false);
    const [popupPosition,setPopupPosition]=useState({top:0,left:0});
    const {folderNames}=useContext(FolderNamesContext);
    const timeoutRef = useRef(null);
    const navigateRouter = useNavigate();
    const popupRef = useRef(null);

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

    useEffect(()=>{
        if(showPopup){
            const handleClickOutSide=(event)=>{
                if(popupRef.current && !popupRef.current.contains(event.target)){
                    setShowPopup(false);
                }
            }
            document.addEventListener('mousedown',handleClickOutSide);

            return ()=>{
                document.removeEventListener('mousedown',handleClickOutSide);
            }
        }
    },[showPopup])

    function handleOpenCreateFolderDialog(bool){
        setIsCreateFolderDialogOpen(bool);
    }

    function handleFolderRouting(folderName,e){
        if(showPopup){
            e.preventDefault();
        }else{
            navigateRouter(`folders/${folderName}`)
        }
    }

    function handleFolderMouseDown(event){
        const rect = event.target.getBoundingClientRect();
        setPopupPosition({top:rect.bottom,left:rect.left});
        timeoutRef.current = setTimeout(()=>{
            setShowPopup(true);
        },900);        
    }

    function handleFolderMouseUp(){
        clearTimeout(timeoutRef.current);

    }

    function handleFolderMouseLeave(){
        clearTimeout(timeoutRef.current);
    }

    return(
        <Fragment>
            <div className="side-bar" style={sideBarStyles} ref={sideBarRef}>
            {isSideBarOpen && <Fragment>
               <Link to='/'> <div className='side-bar-items side-bar-home'><i className="fa-solid fa-house"></i>Home</div></Link>
               <Link to='/fav'> <div className='side-bar-items'><i className="fa-solid fa-star" style={{color:'gold'}}></i>Favorites</div></Link>
               <hr />
               <div className='side-bar-items add-folders-btn' onClick={()=>handleOpenCreateFolderDialog(true)}><i className='fa-solid fa-folder-plus'></i>Create</div>
               {
                folderNames.map((folder,index)=>{
                    return <div key={index} className='side-bar-items' onClick={(e)=>handleFolderRouting(folder,e)} onMouseDown={handleFolderMouseDown} onMouseUp={handleFolderMouseUp} onMouseLeave={handleFolderMouseLeave} onTouchStart={handleFolderMouseDown} onTouchEnd={handleFolderMouseLeave}><i className='fa-solid fa-folder'></i>{folder}</div>
                })
               }
               {showPopup && <div ref={popupRef} className='folder-options-div' style={{
                top:popupPosition.top-25,
                left:popupPosition.left-320,
               }}>
                <div><i className='fa-regular fa-pen-to-square'></i>Rename</div>
                <div><i className='fa-regular fa-trash-can'></i>Delete</div>
               </div>}
               </Fragment>}
            </div>
            <div className='side-bar-toggle' ref={sideBarToggleRef}><i className={isSideBarOpen ? '' : 'fa-solid fa-bars'} onClick={sideBarToggleHandler}></i></div>
            <SetFolderDialog setIsCreateFolderDialogOpen={setIsCreateFolderDialogOpen} ref={createFolderDialogRef} isCreateFolderDialogOpen={isCreateFolderDialogOpen} />
        </Fragment>
    )
}
export default SideBar;