import { forwardRef } from 'react';
import './multi-delete-folder-dialog.styles.css';
import PropTypes from 'prop-types';
import { ref, remove } from 'firebase/database';
import { auth, database } from '../../utils/firebase';
import { RiFolder3Fill } from 'react-icons/ri';

const MultiDeleteFolderDialog=forwardRef(({folderArray,setIsMultiFolderdeleteDialogOpen},ref1)=>{

    const user = auth.currentUser;


    const handleFolderDeleting=()=>{
        if(folderArray.length){
            deleteFolders();
        }
    }

    const deleteFolders=async()=>{
        const promises = folderArray.map(folder=>{
            const folderRef = ref(database,`shoppingLists/${user.uid}/folders/${folder}`)
            return remove(folderRef);
        });

        try{
            await Promise.all(promises);
            // console.log('success');
            setIsMultiFolderdeleteDialogOpen(false)
        }catch(e){
            console.error('error deleting folders',e)
        }
    }

    return(
        <div className='overlaying'>
        <div className='multi-folder-delete-dialog' ref={ref1}>
            <div className='title'>Delete the following folders</div>
            <div className='folder-array-div'>
                {folderArray.map((folder,index)=>{
                    return <span key={index}><RiFolder3Fill/> {folder}</span>
                })}
            </div>
            <div className='btn-wrapper'>
                <button onClick={()=>setIsMultiFolderdeleteDialogOpen(false)}>Cancel</button>
                <div></div>
                <button style={{color:"#DF4647"}} onClick={handleFolderDeleting}>Delete</button>
            </div>
        </div>
        </div>
    )
})
MultiDeleteFolderDialog.displayName='MultiDeleteFolderDialog'
MultiDeleteFolderDialog.propTypes={
    folderArray:PropTypes.array,
    setIsMultiFolderdeleteDialogOpen:PropTypes.func,
}
export default MultiDeleteFolderDialog;