import { useEffect, useRef, useState } from 'react';
import './rename-container.styles.css';
import PropTypes from 'prop-types';
const RenameContainer=({isEditIconClicked,handleRenameIconClick,clickedItemName,handleRename,handleSetClickedItemIdToNull,folderType,clickedItemPrice})=>{
    const inputRef = useRef(null);
    const [inputValue,setInputValue] = useState('');
    const [priceValue,setPriceValue] = useState('');
    const [isNameChanged,setIsNameChanged]=useState(false);
    const renameButtonRef = useRef(null);

    useEffect(()=>{        
        setInputValue(clickedItemName ?? 'new name');
        setPriceValue(clickedItemPrice ?? '0');
    },[clickedItemName,clickedItemPrice])
    
    useEffect(()=>{
        if(isEditIconClicked){
            inputRef.current.focus();
        }
    },[isEditIconClicked]);

    useEffect(()=>{
        let isChanged=inputValue?.trim() !== clickedItemName?.trim() || priceValue?.trim() !== clickedItemPrice?.trim()
        setIsNameChanged(isChanged)

    },[inputValue,clickedItemName,priceValue,clickedItemPrice])
    
    function inputChangeHandler(val){
        setInputValue(val);
    }
    function handleOkClick(){
        if(!renameButtonRef.current?.disabled){
            handleRename(inputValue,priceValue);
            inputRef.current.blur();
        }
    }
    
    function renameEnterHandler(key){
        if(key === 'Enter'){
            handleOkClick();
        }
    }
    // console.log('render rename container');
    return(
        <div className='overlaying' onClick={()=>handleRenameIconClick(false)}>
        <div className='rename-container' style={{height:!folderType ? '80px' : '100px'}} onClick={(e)=>e.stopPropagation()}>
        <p>Rename the list item ?</p>
            <div className="rename-input-div">
            <input type="text" maxLength={35} value={inputValue} ref={inputRef} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>renameEnterHandler(e.key)} />
            <div className="input-len-indicator">
            {inputValue ? inputValue.length : ''}/35
            </div>
            </div>
            {folderType && <div className='price-div'>
                <input value={priceValue} onChange={(e)=>setPriceValue(e.target.value)} maxLength={15} onKeyUp={(e)=>renameEnterHandler(e.key)} />
            </div>}
            <div className='rename-container-btn-wrapper' style={{top:!folderType ?'41%':'48%'}}>
                <button onClick={()=>{
                    handleRenameIconClick(false)
                    handleSetClickedItemIdToNull(null);
                }}>Cancel</button>
                <button onClick={handleOkClick} ref={renameButtonRef} disabled={!isNameChanged || inputValue==='' || priceValue===''}>Rename</button>
            </div>
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
    folderType:PropTypes.string,
    clickedItemPrice:PropTypes.string
}
export default RenameContainer;
