import { createContext, useState } from "react";
import PropTypes from 'prop-types';
export const FolderNamesContext = createContext();

export const FolderNamesProvider=({children})=>{
    const [folderNames,setFolderNames]=useState([]);

    function handleFolderNamesAdd(arr){      
        setFolderNames([...arr]);
    }

    return(
        <FolderNamesContext.Provider value={{folderNames,handleFolderNamesAdd}}>
        {children}
        </FolderNamesContext.Provider>
    )
}
FolderNamesProvider.propTypes={
    children:PropTypes.node,
}