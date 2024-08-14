import { useParams } from "react-router-dom"
import './folder.styles.css';
import FolderTitle from "../../folder-title/folder-title.component";
import InputAndBtn from "../../input-and-btn/Input-and-btn.component";
import ShoppingList from "../../shopping-list/shopping-list.component";
import FolderOptions from "../../folder-options/folder-options.component";
import { useEffect, useRef, useState } from "react";
const FolderComponent=()=>{
    const {folderName} = useParams();
    const [isFolderOptionsOpen,setIsFolderOptionsOpen]=useState(false);
    const folderComponentEllipsisRef = useRef(null);
    const folderOptionsDivRef = useRef(null);

    useEffect(()=>{
        if(isFolderOptionsOpen){
            const handleClickOutSide=(event)=>{
                if(folderComponentEllipsisRef.current && !folderComponentEllipsisRef.current.contains(event.target) && folderOptionsDivRef.current && !folderOptionsDivRef.current.contains(event.target)){
                    setIsFolderOptionsOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[isFolderOptionsOpen])

    return(
        <div className="folder-component-container">
            <FolderTitle folderName={folderName} />
            <InputAndBtn placeHolder='Enter Items' buttonText='Add To Folder' pushAsFav={false} dbReference={`folders/${folderName}`} />
            <ShoppingList isFavItemsOnly={false} dbReference={`folders/${folderName}`} isFavOptionRequired={false} />
            <div className="folder-component-ellipsis" ref={folderComponentEllipsisRef} onClick={()=>setIsFolderOptionsOpen(!isFolderOptionsOpen)}><i className="fa-solid fa-ellipsis-vertical"></i></div>
            {isFolderOptionsOpen && <FolderOptions ref={folderOptionsDivRef}/>}
        </div>
    )
}
export default FolderComponent;