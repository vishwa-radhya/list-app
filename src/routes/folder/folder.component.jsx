import { useParams } from "react-router-dom"
import './folder.styles.css';
import FolderTitle from "../../folder-title/folder-title.component";
import InputAndBtn from "../../input-and-btn/Input-and-btn.component";
import ShoppingList from "../../shopping-list/shopping-list.component";
const FolderComponent=()=>{
    const {folderName} = useParams();
    
    return(
        <div className="folder-component-container">
            <FolderTitle folderName={folderName} />
            <InputAndBtn placeHolder='Enter Items' buttonText='Add To Folder' pushAsFav={false} dbReference={`folders/${folderName}`} />
            <ShoppingList isFavItemsOnly={false} dbReference={`folders/${folderName}`} isFavOptionRequired={false} />
        </div>
    )
}
export default FolderComponent;