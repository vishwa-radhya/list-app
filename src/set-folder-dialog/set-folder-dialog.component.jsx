import { forwardRef, useContext, useEffect } from 'react';
import './set-folder-dialog.styles.css';
import { database } from "../utils/firebase";
import { set,ref, onValue } from "firebase/database";
import { auth } from "../utils/firebase";
import { useState } from 'react';
import { FolderNamesContext } from '../contexts/folder-names-context';
import PropTypes from 'prop-types';

const SetFolderDialog=forwardRef(({setIsCreateFolderDialogOpen,isCreateFolderDialogOpen},ref1)=>{

    const [inputValue,setInputValue] = useState('');
    const user=auth.currentUser;
    const {handleFolderNamesAdd,folderNames,isFolderExisted,handleFolderExistedError}=useContext(FolderNamesContext);

    useEffect(()=>{
        if(user){
            const dbFolderReference = ref(database,`shoppingLists/${user.uid}/folders`)
            onValue(dbFolderReference,(snapshot)=>{
                const data = snapshot.val();
                const folderNamesFromDbArr = Object.keys(data);                
                handleFolderNamesAdd(folderNamesFromDbArr);
            })
        }
    },[user,handleFolderNamesAdd])

    function inputChangeHandler(val){
        setInputValue(val);
    }
    
    function handleCreateClick(){
        if(inputValue.trim() && !folderNames.includes(inputValue.trim())){
            const dbReference = ref(database,`shoppingLists/${user.uid}/folders/${inputValue}/marker`);
            set(dbReference,true);
            setIsCreateFolderDialogOpen(false);
            setInputValue('');
            handleFolderExistedError(false);
        }else{
            handleFolderExistedError(true);
        }
    }

    function createEnterHandler(key){
        if(key === 'Enter'){
            handleCreateClick();
        }
    }

    const setFolderNameDialogStyles={
        height:isCreateFolderDialogOpen?'auto' :'0',
        padding:isCreateFolderDialogOpen?'15px 15px 6px 15px':'0',
    }

    return(
        <div className="set-folder-name-dialog" ref={ref1} style={setFolderNameDialogStyles}>
            <p>Enter the name for the folder</p>
            <div className="set-folder-name-dialog-input-div">
            <input type="text" maxLength={25} value={inputValue} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>createEnterHandler(e.key)} />
            <div className="input-len-indicator">
            {inputValue ? inputValue.length : ''}/25
            </div>
            </div>
            <div className='set-folder-name-dialog-btn-wrapper'>
                <button onClick={
                    ()=>{
                        setIsCreateFolderDialogOpen(false)
                        handleFolderExistedError(false);
                        setInputValue('')
                    }
                }>Cancel</button>
                <button onClick={handleCreateClick}>Create</button>
             </div>
             {isFolderExisted && <p className='folder-dialog-error-msg' style={{fontSize:'0.7rem'}}>*Null and existed folder names are not allowed</p>}
        </div>
    )
})
SetFolderDialog.displayName='SetFolderDialog';
SetFolderDialog.propTypes={
    setIsCreateFolderDialogOpen:PropTypes.func,
    isCreateFolderDialogOpen:PropTypes.bool,
}
export default SetFolderDialog;