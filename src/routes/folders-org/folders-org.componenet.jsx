import './folders-org.styles.css';
import FolderCog from '../../assets/folder-cog.png'
import { useContext, useEffect, useState } from 'react';
import FolderImage from '../../assets/folder.svg'
import InvoiceImage from '../../assets/invoice.svg';
import {FolderNamesContext} from '../../contexts/folder-names-context';
import SearchNotFound from '../../assets/no-srh-found.png';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import MultiDeleteFolderDialog from '../../components-2/multi-delete-folder-dialog/multi-delete-folder-dialog.component';
import { BiSearch } from 'react-icons/bi';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';

const FoldersOrg=()=>{
    const {folderNames}=useContext(FolderNamesContext);
    const [filteredFolderNames,setFilteredFolderNames]=useState(folderNames);
    const inputRef = useRef(null);
    const [isEllipsisClicked,setIsEllipsisClicked]=useState(false);
    const [isSelectClicked,setIsSelectClicked]=useState(false);
    const navigateRouter = useNavigate();
    const ellipsisRef = useRef(null);
    const folderSelectBtnRef =useRef(null);
    const [selectedFoldersArray,setSelectedFoldersArray]=useState([]);
    const {handleSetRenameFolderDialog,handleSetCurrentFolderName}=useContext(FolderNamesContext);
    const [isMultiFolderDeleteDialogOpen,setIsMultiFolderdeleteDialogOpen]=useState(false);
    const multiFolderDeleteDialogRef = useRef(null);
    const deleteIconRef = useRef(null);
    
    useEffect(()=>{
        setFilteredFolderNames(folderNames);
        setSelectedFoldersArray([]);
    },[folderNames])

    const handleFilterFolder=(e)=>{     
        setFilteredFolderNames(folderNames.filter(folder=>folder?.key.toLowerCase().includes(e.target.value.toLowerCase())))        
    }

    const hanldeFolderSelect=(folder)=>{
        setSelectedFoldersArray(prevState => {
            if (!Array.isArray(prevState)) {
                prevState = []; 
            }
            if(prevState.includes(folder)){
                return prevState.filter(f=>f!==folder);
            }else{
                return [...prevState,folder];
            }
        });
    }
    
    
    const handleFolderRenaming=()=>{
        if(selectedFoldersArray.length){
        handleSetCurrentFolderName(selectedFoldersArray[0])
        handleSetRenameFolderDialog(true);
        }
    }

    useEffect(()=>{
        if(isEllipsisClicked){
            const handleClickOutSide=(event)=>{
                if(ellipsisRef.current && !ellipsisRef.current.contains(event.target) && folderSelectBtnRef.current && !folderSelectBtnRef.current.contains(event.target)){
                    setIsEllipsisClicked(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[isEllipsisClicked])

    useEffect(()=>{
        if(isMultiFolderDeleteDialogOpen){
            const handleClickOutSide=(event)=>{
                if(multiFolderDeleteDialogRef.current && !multiFolderDeleteDialogRef.current.contains(event.target) && deleteIconRef.current && !deleteIconRef.current.contains(event.target)){
                    setIsMultiFolderdeleteDialogOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[isMultiFolderDeleteDialogOpen])
    
    return(
        <div className='folders-org-div animate__animated animate__fadeIn'>
        <div className='options-div'>
                 {isSelectClicked && <FaPenToSquare className='fa-solid fa-pen-to-square' 
                 style={{display:selectedFoldersArray.length===1 ? 'block' : 'none'}}
                  onClick={handleFolderRenaming}></FaPenToSquare>} 
                {isSelectClicked && 
                <div ref={deleteIconRef} className='fa-solid' onClick={()=>setIsMultiFolderdeleteDialogOpen(true)}>
                <FaTrash className=' fa-trash'  style={{display:selectedFoldersArray.length ? 'block' : 'none'}} ></FaTrash></div>}
                <div ref={ellipsisRef} onClick={()=>setIsEllipsisClicked(true)} >
                <FaEllipsisVertical className='fa-solid fa-ellip-vert'  />
                </div>
        </div>
            <SvgWithLoader svgimg={FolderCog} />
            <p>Folders Management</p>
            <div className='input-div'>
            <BiSearch className='fa-magnifying-glass' />
            <input type="search" name="" id="" ref={inputRef} placeholder='search folders' onChange={handleFilterFolder} maxLength={30} onKeyUp={(e)=>{
                if(e.key === 'Enter') {
                    if(inputRef.current) inputRef.current.blur()
                }
            }} />
            </div>
            <div className='folders-div'>
                {filteredFolderNames.map((folder,index)=>{
                    return <div key={index} className='folders' onClick={()=>!isSelectClicked ? navigateRouter(`/folders/${folder?.key}`,{state:folder}) : hanldeFolderSelect(folder)} >
                      <img src={folder?.val?.folderInstanceType ? InvoiceImage :FolderImage} className={folder?.val?.folderInstanceType ? "invoice-folder":""} alt="folder" width={90} />    
                        <span>{folder?.key}</span>
                        {isSelectClicked && 
                            <input type="checkbox" className='folder-select' checked={selectedFoldersArray.includes(folder)} onChange={()=>hanldeFolderSelect(folder)} />
                        }
                    </div>
                })}
                {!filteredFolderNames.length && <img src={SearchNotFound} alt="" className='no-srh-found' width={150} />}
            </div>
            {isEllipsisClicked && <div className='folder-select-btn-div' ref={folderSelectBtnRef} onClick={()=>setIsSelectClicked(!isSelectClicked)}>
                {!isSelectClicked ? <FaRegSquare/> : <FaRegSquareCheck/>}
                <span>Select...</span>
            </div>}
            {isMultiFolderDeleteDialogOpen && <MultiDeleteFolderDialog folderArray={selectedFoldersArray} ref={multiFolderDeleteDialogRef} setIsMultiFolderdeleteDialogOpen={setIsMultiFolderdeleteDialogOpen} />}
        </div>
    )
}
export default FoldersOrg;