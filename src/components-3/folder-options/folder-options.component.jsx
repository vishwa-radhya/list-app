import { forwardRef, useContext } from 'react';
import './folder-options.styles.css';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleInfo } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';

const FolderOptions=forwardRef((props,ref1)=>{
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog}=useContext(FolderNamesContext);
    const navigateRouter = useNavigate();
    const pathLocation = useLocation();
    
    const handleFolderInfoRouting=()=>{
        navigateRouter(`${pathLocation.pathname}/info`)        
    }

    return(
        <div className='folder-options-division' ref={ref1}>
            <div onClick={handleFolderInfoRouting}><FaCircleInfo className='frfa'></FaCircleInfo>Details</div>
            <hr />
            <div onClick={()=>{
                handleSetDeleteFolderDialog(false);
                handleSetRenameFolderDialog(true)
            }}><FaPen className='frfa'></FaPen>Rename</div>
            <div onClick={()=>{
                handleSetRenameFolderDialog(false);
                handleSetDeleteFolderDialog(true)
            }}><FaTrash className='frfa'></FaTrash>Delete</div>
        </div>
    )
})
FolderOptions.displayName='FolderOptions'
export default FolderOptions;