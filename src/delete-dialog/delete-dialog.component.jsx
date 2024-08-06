import { forwardRef, useContext } from 'react';
import './delete-dialog.styles.css';
import { FolderNamesContext } from '../contexts/folder-names-context';
import { ref, remove } from "firebase/database";
import { database,auth } from '../utils/firebase';
import { useLocation,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DeleteDialog=forwardRef(({deleteFolderName,setShowPopup},ref1)=>{
    const {handleSetDeleteFolderDialog,isDeleteFolderDialogOpen}=useContext(FolderNamesContext);

    const location = useLocation();
    const navigateRouter = useNavigate();
    const user = auth.currentUser;


    const deleteDialogStyles={
        height:isDeleteFolderDialogOpen ? 'auto' : '0',
        width:isDeleteFolderDialogOpen ? 'auto' : '0',
        padding:isDeleteFolderDialogOpen ? '10px' : '0',
    }

    function handleFolderDelete(){
        // console.log(deleteFolderName);
        // console.log(location.pathname);
        // navigator('/')
        if(deleteFolderName){
            if(location.pathname.includes(deleteFolderName.replaceAll(' ','%20'))){
                navigateRouter('/')
            }
            const folderRefPath = ref(database,`shoppingLists/${user.uid}/folders/${deleteFolderName}`);
            remove(folderRefPath).catch(e=>console.log(e))
            handleSetDeleteFolderDialog(false);
            setShowPopup(false);
        }
        
    }

    return(
        <div className="delete-folder-dialog" ref={ref1} style={deleteDialogStyles}>
            <p>Are you sure you want to delete this folder?</p>
            <div className="btn-wrapper">
            <button className='dfd-cnl' onClick={()=>handleSetDeleteFolderDialog(false)}>Cancel</button>
            <button className='dfd-del' onClick={handleFolderDelete}>Delete</button>
            </div>
        </div>
    )
})
DeleteDialog.displayName='DeleteDialog';
DeleteDialog.propTypes={
    deleteFolderName:PropTypes.string,
    setShowPopup:PropTypes.func,
}
export default DeleteDialog;