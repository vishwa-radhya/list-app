import './folders-org.styles.css';
import FolderCog from '../../assets/folder-cog.png'
import { useContext, useEffect, useState } from 'react';
import FolderImage from '../../assets/folder.svg'
import {FolderNamesContext} from '../../contexts/folder-names-context';
import SearchNotFound from '../../assets/no-srh-found.png';
import Loader from '../../loader/loader.component';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { auth, database } from '../../utils/firebase';
const FoldersOrg=()=>{
    const {folderNames}=useContext(FolderNamesContext);
    const [filteredFolderNames,setFilteredFolderNames]=useState(folderNames);
    const [isImgLoaded,setIsImgLoaded]=useState(false);
    const inputRef = useRef(null);
    const [isEllipsisClicked,setIsEllipsisClicked]=useState(false);
    const [isSelectClicked,setIsSelectClicked]=useState(false);
    const navigateRouter = useNavigate();
    const ellipsisRef = useRef(null);
    const folderSelectBtnRef =useRef(null);
    const [selectedFoldersArray,setSelectedFoldersArray]=useState([]);
    const {handleSetRenameFolderDialog,handleSetCurrentFolderName}=useContext(FolderNamesContext);
    const user = auth.currentUser;
    
    useEffect(()=>{
        setFilteredFolderNames(folderNames);
        setSelectedFoldersArray([]);
    },[folderNames])

    const handleFilterFolder=(e)=>{        
        setFilteredFolderNames(folderNames.filter(folder=>folder.toLowerCase().includes(e.target.value.toLowerCase())))        
    }

    const hanldeFolderSelect=(folder,e)=>{
        setSelectedFoldersArray(prevState => {
            if (!Array.isArray(prevState)) {
                prevState = []; 
            }
            if (e.target.checked) {
                return [...prevState, folder]; 
            } else {
                return prevState.filter(f => f !== folder); 
            }
        });
    }
    
    const handleFolderRenaming=()=>{
        if(selectedFoldersArray.length){
        handleSetCurrentFolderName(selectedFoldersArray[0])
        handleSetRenameFolderDialog(true);
        }
    }

    const handleFolderDeleting=()=>{
        if(selectedFoldersArray.length){
            deleteFolders();
        }
    }

    const deleteFolders=async()=>{
        const promises = selectedFoldersArray.map(folder=>{
            const folderRef = ref(database,`shoppingLists/${user.uid}/folders/${folder}`)
            return remove(folderRef);
        });

        try{
            await Promise.all(promises);
            // console.log('success');
        }catch(e){
            console.error('error deleting folders',e)
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

    return(
        <div className='folders-org-div'>
        <div className='options-div'>
                 {isSelectClicked && <i className='fa-solid fa-pen-to-square' 
                 style={{display:selectedFoldersArray.length===1 ? 'block' : 'none'}}
                  onClick={handleFolderRenaming}></i>} 
                {isSelectClicked && <i className='fa-solid fa-trash' style={{display:selectedFoldersArray.length ? 'block' : 'none'}} onClick={handleFolderDeleting}></i>}
                <i className='fa-solid fa-ellipsis-vertical' ref={ellipsisRef} onClick={()=>setIsEllipsisClicked(true)}></i>
            
        </div>
            <div className='folder-cog-img'>
            {!isImgLoaded && <Loader/>}
            <img src={FolderCog} width={160} alt="" onLoad={()=>setIsImgLoaded(true)} />
            </div>
            <p>Folders Management</p>
            <div className='input-div'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" name="" id="" ref={inputRef} placeholder='search folders' onChange={handleFilterFolder} maxLength={30} onKeyUp={(e)=>{
                if(e.key === 'Enter') {
                    if(inputRef.current) inputRef.current.blur()
                }
            }} />
            </div>
            <div className='folders-div'>
                {filteredFolderNames.map((folder,index)=>{
                    return <div key={index} className='folders'>
                        <img src={FolderImage} alt="folder" width={90} onClick={()=>navigateRouter(`/folders/${folder}`)} />
                        <span>{folder}</span>
                        {isSelectClicked && 
                            <input type="checkbox" className='folder-select' checked={selectedFoldersArray.includes(folder)} onChange={(e)=>hanldeFolderSelect(folder,e)} />
                        }
                    </div>
                })}
                {!filteredFolderNames.length && <img src={SearchNotFound} alt="" className='no-srh-found' width={150} />}
            </div>
            {isEllipsisClicked && <div className='folder-select-btn-div' ref={folderSelectBtnRef} onClick={()=>setIsSelectClicked(!isSelectClicked)}>
                <i className={!isSelectClicked ? 'fa-regular fa-square' :'fa-regular fa-square-check'}></i>
                <span>Select...</span>
            </div>}
        </div>
    )
}
export default FoldersOrg;