import { createContext, useCallback, useState } from "react";
export const FolderNamesContext = createContext();
import PropTypes from 'prop-types';

export const FolderNamesProvider=({children})=>{
    const [folderNames,setFolderNames]=useState([]);
    const [isFolderExisted,setIsFolderExisted]=useState(false);
    const [isDeleteFolderDialogOpen,setIsdeleteFolderDialogOpen]=useState(false);
    const [isRenameFolderDialogOpen,setIsRenameFolderDialogOpen]=useState(false);
    const [currentFolderName,setCurrentFolderName]=useState('');
    const [invoiceFolderNames,setInvoiceFolderNames]=useState([]);

    const handleSetCurrentFolderName=(val)=>{
        setCurrentFolderName(val);
    }

    const handleFolderNamesAdd=useCallback((arr)=>{
        setFolderNames(arr);
        setInvoiceFolderNames(arr.filter(o=>o?.val?.folderInstanceType))
    },[]);
    
    const handleFolderExistedError=(bool)=>{
        setIsFolderExisted(bool);
    }

    const handleSetDeleteFolderDialog=(bool)=>{
        setIsdeleteFolderDialogOpen(bool);
    }

    const handleSetRenameFolderDialog=(bool)=>{
        setIsRenameFolderDialogOpen(bool);
    }

    const folderNamesContextValues={
        folderNames,handleFolderNamesAdd,isFolderExisted,handleFolderExistedError,isDeleteFolderDialogOpen,handleSetDeleteFolderDialog,isRenameFolderDialogOpen,handleSetRenameFolderDialog,currentFolderName,handleSetCurrentFolderName,invoiceFolderNames
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