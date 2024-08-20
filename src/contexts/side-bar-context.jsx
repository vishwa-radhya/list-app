import { createContext,useState } from "react";
import PropTypes from 'prop-types';

export const SideBarContext = createContext();

export const SideBarProvider =({children})=>{
    const [isSideBarOpen,setIsSideBarOpen]=useState(false);
    
    const handleSetIsSideBarOpen=(bool)=>{
        setIsSideBarOpen(bool);
    }

    return(
        <SideBarContext.Provider value={{isSideBarOpen,handleSetIsSideBarOpen}}>
            {children}
        </SideBarContext.Provider>
    )
}
SideBarProvider.propTypes={
    children:PropTypes.node,
}