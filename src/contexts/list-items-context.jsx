import { createContext, useCallback, useState } from "react";
import PropTypes from 'prop-types';
export const ListItemsContext = createContext();

export const ListItemsProvider =({children})=>{
    const [items,setItems]=useState([]);
    const [markerValue,setMarkerValue]=useState('Sun Sep 00 0000 00:00:00');

    const handleSetItems=useCallback((arr)=>{
        setItems(arr);
    },[])

    const handleSetMarkerValue=useCallback((val)=>{
        setMarkerValue(val);
    },[])

    return(
        <ListItemsContext.Provider value={{items,handleSetItems,markerValue,handleSetMarkerValue}}>
            {children}
        </ListItemsContext.Provider>
    )
}
ListItemsProvider.propTypes={
    children:PropTypes.node,
}