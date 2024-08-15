import { forwardRef, useContext } from 'react';
import './folder-options.styles.css';
import { FolderNamesContext } from '../contexts/folder-names-context';

const FolderOptions=forwardRef((props,ref1)=>{
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog}=useContext(FolderNamesContext);
    return(
        <div className='folder-options-division' ref={ref1}>
            <div><i className='fa-solid fa-circle-info'></i>Details</div>
            <hr />
            <div onClick={()=>{
                handleSetDeleteFolderDialog(false);
                handleSetRenameFolderDialog(true)
            }}><i className='fa-solid fa-pen'></i>Rename</div>
            <div onClick={()=>{
                handleSetRenameFolderDialog(false);
                handleSetDeleteFolderDialog(true)
            }}><i className='fa-solid fa-trash'></i>Delete</div>
        </div>
    )
})
FolderOptions.displayName='FolderOptions'
export default FolderOptions;