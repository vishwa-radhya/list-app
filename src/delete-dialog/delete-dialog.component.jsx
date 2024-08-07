import { forwardRef, useContext } from 'react';
import './delete-dialog.styles.css';
import { FolderNamesContext } from '../contexts/folder-names-context';
import { ref, remove } from "firebase/database";
import { database,auth } from '../utils/firebase';
import { useLocation,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DeleteDialog=forwardRef(({deleteFolderName,setShowPopup},ref1)=>{
    const {handleSetDeleteFolderDialog}=useContext(FolderNamesContext);

    const location = useLocation();
    const navigateRouter = useNavigate();
    const user = auth.currentUser;

    function handleFolderDelete(){
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
        <div className="delete-folder-dialog" ref={ref1} >
            <p>Are you sure you want to delete this folder?<span>  {deleteFolderName}</span> </p>
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
    )
})
DeleteDialog.displayName='DeleteDialog';
DeleteDialog.propTypes={
    deleteFolderName:PropTypes.string,
    setShowPopup:PropTypes.func,
}
export default DeleteDialog;