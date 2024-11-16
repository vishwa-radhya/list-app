import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const HelperContext = createContext();

export const HelperProvider=({children})=>{

    const [aiChatMessages,setAiChatMessages]=useState([]);

    return(
        <HelperContext.Provider value={{aiChatMessages,setAiChatMessages}}>
            {children}
        </HelperContext.Provider>
    )
}
HelperProvider.propTypes={
    children:PropTypes.node,
}