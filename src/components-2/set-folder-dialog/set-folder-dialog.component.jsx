import { forwardRef, useContext, useEffect, useRef } from 'react';
import './set-folder-dialog.styles.css';
import { database } from "../../utils/firebase";
import { set,ref } from "firebase/database";
import { auth } from "../../utils/firebase";
import { useState } from 'react';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import PropTypes from 'prop-types';


const SetFolderDialog=forwardRef(({setIsCreateFolderDialogOpen,isCreateFolderDialogOpen,createFolderButtonRef},ref1)=>{

    const [inputValue,setInputValue] = useState('');
    const user=auth.currentUser;
    const {folderNames,isFolderExisted,handleFolderExistedError}=useContext(FolderNamesContext);
    const createFolderDialogInputRef = useRef(null);
    
    useEffect(()=>{                
        if(isCreateFolderDialogOpen){
            createFolderDialogInputRef.current.focus();
        }
    },[isCreateFolderDialogOpen]);

    function inputChangeHandler(val){
        setInputValue(val);
        if(isFolderExisted) handleFolderExistedError(false)
    }

    useEffect(()=>{
        if(isCreateFolderDialogOpen){
            const handleClickOutSide =(event)=>{
                if(
                    (!ref1.current || !ref1.current.contains(event.target)) && createFolderButtonRef.current && !createFolderButtonRef.current.contains(event.target)
                ){
                    setIsCreateFolderDialogOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
        
        return ()=>{
            document.removeEventListener('click',handleClickOutSide);
        }
    }
    },[isCreateFolderDialogOpen,createFolderButtonRef,ref1,setIsCreateFolderDialogOpen])
    
    function handleCreateClick(){
        if(inputValue.trim() && !folderNames.includes(inputValue.trim())){
            const dbReference = ref(database,`shoppingLists/${user.uid}/folders/${inputValue}/marker`);
            set(dbReference,Date().split('GMT')[0]);
            setIsCreateFolderDialogOpen(false);
            setInputValue('');
            handleFolderExistedError(false);
            createFolderDialogInputRef.current.blur();
        }else{
            handleFolderExistedError(true);
        }
    }
    
    function createEnterHandler(key){
        if(key === 'Enter'){
            handleCreateClick();
        }
    }
    // console.log('render set folder dialog');
    return(
        <div className='overlaying' onClick={(e)=>{
            e.stopPropagation()
            setIsCreateFolderDialogOpen(false);
        }}>
        <div className="set-folder-name-dialog" ref={ref1} onClick={(e)=>e.stopPropagation()} >
            <p>Enter the name for the folder</p>
            <div className="set-folder-name-dialog-input-div">
            <input type="text" maxLength={25} value={inputValue} ref={createFolderDialogInputRef} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>createEnterHandler(e.key)} />
            <div className="input-len-indicator">
            {inputValue ? inputValue.length : '0'}/25
            </div>
            </div>
            <div className='set-folder-name-dialog-btn-wrapper'>
                <button onClick={
                    (e)=>{
                        e.stopPropagation();
                        setIsCreateFolderDialogOpen(false)
                        handleFolderExistedError(false);
                        setInputValue('')
                    }
                }>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
             </div>
             {isFolderExisted && <p className='folder-dialog-error-msg' style={{fontSize:'0.7rem'}}>*Null and existed folder names are not allowed</p>}
        </div>
        </div>
    )
})
SetFolderDialog.displayName='SetFolderDialog';
SetFolderDialog.propTypes={
    setIsCreateFolderDialogOpen:PropTypes.func,
    isCreateFolderDialogOpen:PropTypes.bool,
    createFolderButtonRef:PropTypes.object,
}
export default SetFolderDialog;