import { createContext, useCallback, useState } from "react";
import PropTypes from 'prop-types';
export const FolderNamesContext = createContext();

export const FolderNamesProvider=({children})=>{
    const [folderNames,setFolderNames]=useState([]);
    const [isFolderExisted,setIsFolderExisted]=useState(false);
    const [isDeleteFolderDialogOpen,setIsdeleteFolderDialogOpen]=useState(false);

    const handleFolderNamesAdd=useCallback((arr)=>{
        setFolderNames(arr);
    },[]);

    const handleFolderExistedError=(bool)=>{
        setIsFolderExisted(bool);
    }

    const handleSetDeleteFolderDialog=(bool)=>{
        setIsdeleteFolderDialogOpen(bool);
    }

    const folderNamesContextValues={
        folderNames,handleFolderNamesAdd,isFolderExisted,handleFolderExistedError,isDeleteFolderDialogOpen,handleSetDeleteFolderDialog
    }

    return(
        <FolderNamesContext.Provider value={folderNamesContextValues}>
        {children}
        </FolderNamesContext.Provider>
    )
}
FolderNamesProvider.propTypes={
    children:PropTypes.node,
}