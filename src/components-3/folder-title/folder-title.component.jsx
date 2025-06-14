import './folder-title.styles.css';
import PropTypes from 'prop-types';
import FolderSvg from '../../assets/folder.svg';
import InvoiceSvg from '../../assets/invoice.svg';

const FolderTitle=({folderName,folderInstanceType})=>{     
    return(
        <div className="folder-title-container">
            {<img src={!folderInstanceType ? FolderSvg : InvoiceSvg} className={folderInstanceType ? "invoice-folder":""} alt="" />}
            <p>{folderName}</p>
        </div>
    )
}
FolderTitle.propTypes={
    folderName:PropTypes.string,
    folderInstanceType:PropTypes.string,
}
export default FolderTitle;