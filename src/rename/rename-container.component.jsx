import { useEffect, useRef, useState } from 'react';
import './rename-container.styles.css';
import PropTypes from 'prop-types';
const RenameContainer=({isEditIconClicked,handleRenameIconClick,clickedItemName,handleRename,handleSetClickedItemIdToNull})=>{
    const inputRef = useRef(null);
    const [inputValue,setInputValue] = useState(clickedItemName);
    
    useEffect(()=>{
        setInputValue(clickedItemName);
    },[clickedItemName])

    useEffect(()=>{
        if(isEditIconClicked){
            inputRef.current.focus();
        }
    },[isEditIconClicked]);

    const renameContainerStyles={
        height:isEditIconClicked ? '70px' : '0',
        padding:isEditIconClicked ? '25px' : '0',
    }
    
    function inputChangeHandler(val){
        setInputValue(val);
    }
    function handleOkClick(){
        handleRename(inputValue);
    }

    return(
        <div className='rename-container' style={renameContainerStyles}>
        <p>Rename the list item ?</p>
            <input type="text" value={inputValue} ref={inputRef} onChange={(e)=>inputChangeHandler(e.target.value)} />
            <div className='rename-container-btn-wrapper'>
                <button onClick={()=>{
                    handleRenameIconClick(false)
                    handleSetClickedItemIdToNull(null);
                }}>Cancel</button>
                <button onClick={handleOkClick}>Rename</button>
            </div>
        </div>
    )
}
RenameContainer.propTypes={
    isEditIconClicked:PropTypes.bool,
    handleRenameIconClick:PropTypes.func,
    clickedItemName:PropTypes.string,
    handleRename:PropTypes.func,
    handleSetClickedItemIdToNull:PropTypes.func,
}
export default RenameContainer;