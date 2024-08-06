import './folder-title.styles.css';
import PropTypes from 'prop-types';
const FolderTitle=({folderName})=>{
    return(
        <div className="folder-title-container">
            {folderName}
        </div>
    )
}
FolderTitle.propTypes={
    folderName:PropTypes.string,
}
export default FolderTitle;