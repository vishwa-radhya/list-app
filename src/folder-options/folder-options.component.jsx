import { forwardRef } from 'react';
import './folder-options.styles.css';

const FolderOptions=forwardRef((props,ref1)=>{
    return(
        <div className='folder-options-division' ref={ref1}>
            <div><i className='fa-solid fa-circle-info'></i>Details</div>
            <hr />
            <div><i className='fa-solid fa-pen'></i>Rename</div>
            <div><i className='fa-solid fa-trash'></i>Delete</div>
        </div>
    )
})
FolderOptions.displayName='FolderOptions'
export default FolderOptions;