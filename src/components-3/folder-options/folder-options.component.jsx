import { forwardRef, Fragment, useContext } from 'react';
import './folder-options.styles.css';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleInfo } from 'react-icons/fa6';
import { FaPen,FaTrash,FaFileExport,FaArrowsSplitUpAndLeft } from 'react-icons/fa6';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PropTypes from 'prop-types';
import { HelperContext } from '../../contexts/helper-context.context';

pdfMake.vfs = pdfFonts.vfs;
const FolderOptions=forwardRef((props,ref1)=>{
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog}=useContext(FolderNamesContext);
    const navigateRouter = useNavigate();
    const pathLocation = useLocation();
    const { folderInstanceType } = props;
    const {handlePdfGeneration,handleSetSplitDialogOpen}=useContext(HelperContext);
    
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
            {folderInstanceType && <Fragment>
            <div onClick={()=>{
                handlePdfGeneration(false);
            }}><FaFileExport className='frfa'></FaFileExport>Export</div>
            <div onClick={()=>{
                handleSetSplitDialogOpen(true)
            }}><FaArrowsSplitUpAndLeft className='frfa'></FaArrowsSplitUpAndLeft>Split</div>
            </Fragment>}
        </div>
    )
})
FolderOptions.propTypes={
    folderInstanceType:PropTypes.string,
}
FolderOptions.displayName='FolderOptions'
export default FolderOptions;