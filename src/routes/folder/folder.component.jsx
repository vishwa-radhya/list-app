import { useParams,useLocation } from "react-router-dom"
import './folder.styles.css';
import FolderTitle from "../../components-3/folder-title/folder-title.component";
import InputAndBtn from "../../components-3/input-and-btn/Input-and-btn.component";
import ShoppingList from "../../components-1/shopping-list/shopping-list.component";
import FolderOptions from "../../components-3/folder-options/folder-options.component";
import { useContext, useEffect, useRef, useState } from "react";
import { FolderNamesContext } from "../../contexts/folder-names-context";
const FolderComponent=()=>{
    const {folderName} = useParams();
    const [isFolderOptionsOpen,setIsFolderOptionsOpen]=useState(false);
    const folderComponentEllipsisRef = useRef(null);
    const folderOptionsDivRef = useRef(null);
    const folderRef = useRef(null);
    const locationUrl = useLocation();
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog,handleSetCurrentFolderName}=useContext(FolderNamesContext);

    useEffect(()=>{
        if(isFolderOptionsOpen){
            const handleClickOutSide=(event)=>{
                if(folderComponentEllipsisRef.current && !folderComponentEllipsisRef.current.contains(event.target) && folderOptionsDivRef.current && !folderOptionsDivRef.current.contains(event.target)){
                    setIsFolderOptionsOpen(false);
                    handleSetDeleteFolderDialog(false);
                    handleSetRenameFolderDialog(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[isFolderOptionsOpen,handleSetDeleteFolderDialog,handleSetRenameFolderDialog])

    useEffect(()=>{
        if(folderRef.current){            
            folderRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void folderRef.current.offsetWidth;
            folderRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[folderName])

    return(
        <div className="folder-component-container animate__animated animate__fadeIn" ref={folderRef}>
            <FolderTitle folderName={folderName} />
            <InputAndBtn placeHolder='Enter Items' buttonText='Add To Folder' pushAsFav={false} dbReference={`folders/${folderName}`} />
            <ShoppingList isFavItemsOnly={false} dbReference={`folders/${folderName}`} isFavOptionRequired={false} />
            <div className="folder-component-ellipsis" ref={folderComponentEllipsisRef} onClick={
                ()=>{setIsFolderOptionsOpen(!isFolderOptionsOpen)
                    handleSetCurrentFolderName(locationUrl.pathname.slice(9).replaceAll('%20',' '))}
            }><i className="fa-solid fa-ellipsis-vertical"></i></div>
            {isFolderOptionsOpen && <FolderOptions ref={folderOptionsDivRef}/>}
        </div>
    )
}
export default FolderComponent;