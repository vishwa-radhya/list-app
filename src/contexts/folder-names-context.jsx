import { createContext, useCallback, useState } from "react";
import PropTypes from 'prop-types';
export const FolderNamesContext = createContext();

export const FolderNamesProvider=({children})=>{
    const [folderNames,setFolderNames]=useState([]);
    const [isFolderExisted,setIsFolderExisted]=useState(false);

    const handleFolderNamesAdd=useCallback((arr)=>{
        setFolderNames([...arr]);
    },[]);

    const handleFolderExistedError=(bool)=>{
        setIsFolderExisted(bool);
    }

    return(
        <FolderNamesContext.Provider value={{folderNames,handleFolderNamesAdd,isFolderExisted,handleFolderExistedError}}>
        {children}
        </FolderNamesContext.Provider>
    )
}
FolderNamesProvider.propTypes={
    children:PropTypes.node,
}