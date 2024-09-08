import { forwardRef, useContext } from 'react';
import './folder-options.styles.css';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { useLocation, useNavigate } from 'react-router-dom';

const FolderOptions=forwardRef((props,ref1)=>{
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog}=useContext(FolderNamesContext);
    const navigateRouter = useNavigate();
    const pathLocation = useLocation();
    
    const handleFolderInfoRouting=()=>{
        navigateRouter(`${pathLocation.pathname}/info`)        
    }

    return(
        <div className='folder-options-division' ref={ref1}>
            <div onClick={handleFolderInfoRouting}><i className='fa-solid fa-circle-info'></i>Details</div>
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