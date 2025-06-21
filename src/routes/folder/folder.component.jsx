import { useParams,useLocation } from "react-router-dom"
import './folder.styles.css';
import FolderTitle from "../../components-3/folder-title/folder-title.component";
import InputAndBtn from "../../components-3/input-and-btn/Input-and-btn.component";
import ShoppingList from "../../components-1/shopping-list/shopping-list.component";
import FolderOptions from "../../components-3/folder-options/folder-options.component";
import { useContext, useEffect, useRef, useState } from "react";
import { FolderNamesContext } from "../../contexts/folder-names-context";
import { FaEllipsisVertical } from 'react-icons/fa6';
import InvoiceInputBtn from "../../components-3/invoice-input-btn/invoice-input-btn.component";
import InvoiceList from "../../components-1/invoice-list/invoice-list.component";
import SplitDialog from "../../components-2/split-dialog/split-dialog.component";
import { HelperContext } from "../../contexts/helper-context.context";

const FolderComponent=()=>{
    const {folderName} = useParams();
    const [isFolderOptionsOpen,setIsFolderOptionsOpen]=useState(false);
    const folderComponentEllipsisRef = useRef(null);
    const folderOptionsDivRef = useRef(null);
    const folderRef = useRef(null);
    const locationUrl = useLocation();
    const folderType = locationUrl.state?.val?.folderInstanceType;
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog,handleSetCurrentFolderName}=useContext(FolderNamesContext);
    const {isSplitDialogOpen}=useContext(HelperContext);
    
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
            <FolderTitle folderName={folderName} folderInstanceType={folderType} />
            {!folderType ? <InputAndBtn placeHolder='Enter Items' buttonText='Add To Folder' pushAsFav={false} dbReference={`folders/${folderName}`} isFavOptionRequired={false}/> : <InvoiceInputBtn placeHolder={'Enter Items'} buttonText={'Add To Invoice'} dbReference={`folders/${folderName}`} />}
            {!folderType ? <ShoppingList isFavItemsOnly={false} dbReference={`folders/${folderName}`} isFavOptionRequired={false} /> : <InvoiceList dbReference={`folders/${folderName}`} />}
            <div className="folder-component-ellipsis" ref={folderComponentEllipsisRef} onClick={
                ()=>{setIsFolderOptionsOpen(!isFolderOptionsOpen)
                    handleSetCurrentFolderName(locationUrl.pathname.slice(9).replaceAll('%20',' '))}
            }><FaEllipsisVertical className="fa-solid fa-ellipsis-vertical"></FaEllipsisVertical></div>
            {isFolderOptionsOpen && <FolderOptions ref={folderOptionsDivRef} folderInstanceType={folderType} />}
            {isSplitDialogOpen && <SplitDialog/>}
        </div>
    )
}
export default FolderComponent;