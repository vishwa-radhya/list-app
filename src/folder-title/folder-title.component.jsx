import './folder-title.styles.css';
import PropTypes from 'prop-types';
import FolderSvg from '../assets/folder.svg';
const FolderTitle=({folderName})=>{
    
    return(
        <div className="folder-title-container">
            <img src={FolderSvg} alt="" />
            <p>{folderName}</p>
        </div>
    )
}
FolderTitle.propTypes={
    folderName:PropTypes.string,
}
export default FolderTitle;