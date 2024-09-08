import { forwardRef, useContext, useEffect } from 'react';
import './delete-dialog.styles.css';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { ref, remove } from "firebase/database";
import { database,auth } from '../../utils/firebase';
import { useLocation,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DeleteDialog=forwardRef(({currentFolderName,setShowPopup,popupDeleteButtonRef},ref1)=>{
    const {handleSetDeleteFolderDialog,isDeleteFolderDialogOpen}=useContext(FolderNamesContext);

    const location = useLocation();
    const navigateRouter = useNavigate();
    const user = auth.currentUser;

    useEffect(()=>{
        if(isDeleteFolderDialogOpen){
            const handleClickOutSide=(event)=>{
                if((!ref1.current && !ref1.current.contains(event.target)) || popupDeleteButtonRef.current && !popupDeleteButtonRef.current.contains(event.target)){
                    handleSetDeleteFolderDialog(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);

            return ()=>{
                document.removeEventListener('click',handleClickOutSide);
            }
        }
    },[handleSetDeleteFolderDialog,isDeleteFolderDialogOpen,ref1,popupDeleteButtonRef]);

    function handleFolderDelete(){
        if(currentFolderName){
            if(location.pathname.includes(currentFolderName.replaceAll(' ','%20'))){
                navigateRouter('/')
            }
            const folderRefPath = ref(database,`shoppingLists/${user.uid}/folders/${currentFolderName}`);
            remove(folderRefPath).catch(e=>console.log(e))
            if(currentFolderName === localStorage.getItem('landingRoute').slice(8)){
                localStorage.setItem('landingRoute','/');
            }
            handleSetDeleteFolderDialog(false);
            setShowPopup(false);
        }
        
    }
    // console.log('render delete dialog');
    return(
        <div className='overlaying'>
        <div className="delete-folder-dialog" ref={ref1} onClick={(e)=>e.stopPropagation()}>
            <p>Are you sure you want to delete this folder?<span>  {currentFolderName}</span> </p>
            <div className="btn-wrapper">
            <button className='dfd-cnl' onClick={
                (e)=>{
                    e.stopPropagation();
                    handleSetDeleteFolderDialog(false)
                }
            }>Cancel</button>
            <button className='dfd-del' onClick={
                (e)=>{
                    e.stopPropagation();
                handleFolderDelete()
            }}>Delete</button>
            </div>
        </div>
        </div>
    )
})
DeleteDialog.displayName='DeleteDialog';
DeleteDialog.propTypes={
    currentFolderName:PropTypes.string,
    setShowPopup:PropTypes.func,
    popupDeleteButtonRef:PropTypes.object,
}
export default DeleteDialog;