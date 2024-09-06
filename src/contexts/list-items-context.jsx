import { createContext, useCallback, useState } from "react";
import PropTypes from 'prop-types';
export const ListItemsContext = createContext();

export const ListItemsProvider =({children})=>{
    const [items,setItems]=useState([]);

    const handleSetItems=useCallback((arr)=>{
        setItems(arr);
    },[])

    return(
        <ListItemsContext.Provider value={{items,handleSetItems}}>
            {children}
        </ListItemsContext.Provider>
    )
}
ListItemsProvider.propTypes={
    children:PropTypes.node,
}