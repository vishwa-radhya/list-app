import './folders-org.styles.css';
import FolderCog from '../../assets/folder-cog.png'
import { useContext, useEffect, useState } from 'react';
import FolderImage from '../../assets/folder.svg'
import {FolderNamesContext} from '../../contexts/folder-names-context';
import SearchNotFound from '../../assets/no-srh-found.png'
const FoldersOrg=()=>{
    const {folderNames}=useContext(FolderNamesContext);
    const [filteredFolderNames,setFilteredFolderNames]=useState(folderNames);
    
    useEffect(()=>{
        setFilteredFolderNames(folderNames);
    },[folderNames])

    const handleFilterFolder=(e)=>{        
        setFilteredFolderNames(folderNames.filter(folder=>folder.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return(
        <div className='folders-org-div'>
            <img src={FolderCog} width={160} alt="" />
            <p>Folders Management</p>
            <div className='input-div'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" name="" id="" placeholder='search folders' onChange={handleFilterFolder} />
            </div>
            <div className='folders-div'>
                {filteredFolderNames.map((folder,index)=>{
                    return <div key={index} className='folders'>
                        <img src={FolderImage} alt="folder" width={90}/>
                        <span>{folder}</span>
                    </div>
                })}
                {!filteredFolderNames.length && <img src={SearchNotFound} alt="" className='no-srh-found' width={150} />}
            </div>
        </div>
    )
}
export default FoldersOrg;