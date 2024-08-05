import { useParams } from "react-router-dom"
import './folder.styles.css';
import FolderTitle from "../../folder-title/folder-title.component";
const FolderComponent=()=>{
    const {folderName} = useParams();
    return(
        <div className="folder-component-container">
            <FolderTitle folderName={folderName} />
        </div>
    )
}
export default FolderComponent;