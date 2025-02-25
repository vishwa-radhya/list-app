import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import './rename-folder-dialog.styles.css';
import { database,auth } from '../../utils/firebase';
import { ref,get,remove,set } from 'firebase/database';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import PropTypes from 'prop-types';
import { useLocation,useNavigate } from 'react-router-dom';

const RenameFolderDialog=forwardRef(({popupRenameButtonRef,currentFolderName,setShowPopup},ref1)=>{

    const [inputValue,setInputValue]=useState('');
    const user = auth.currentUser;
    const [isNameChanged,setIsNameChanged]=useState(false);
    const {handleSetRenameFolderDialog,isRenameFolderDialogOpen,folderNames} =useContext(FolderNamesContext);
    const location = useLocation();
    const navigateRouter = useNavigate();
    const renameFolderDialogInputRef = useRef(null);
    const renameBtnRef = useRef(null);

    useEffect(()=>{
        if(isRenameFolderDialogOpen){
            renameFolderDialogInputRef.current.focus();
        }
    },[isRenameFolderDialogOpen])

    useEffect(()=>{
        if(isRenameFolderDialogOpen){
            const handleClickOutSide =(event)=>{
                if((!ref1.current && !ref1.current.contains(event.target)) || popupRenameButtonRef.current && !popupRenameButtonRef.current.contains(event.target)){                    
                    handleSetRenameFolderDialog(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);

            return ()=>{
                document.removeEventListener('click',handleClickOutSide);
            }
        }
    },[isRenameFolderDialogOpen,popupRenameButtonRef,ref1,handleSetRenameFolderDialog]);

    useEffect(()=>{
        setInputValue(currentFolderName ?? '');
    },[currentFolderName]);

    useEffect(()=>{
        setIsNameChanged(inputValue.trim() !== currentFolderName?.trim())
    },[inputValue,currentFolderName]);

    async function handleFolderRename(){        
        if(currentFolderName && inputValue.trim()){                        
            try{
            const folderRefPath = ref(database,`shoppingLists/${user.uid}/folders/${currentFolderName}`);
            const snapshot = await get(folderRefPath);
            if(snapshot.exists()){
                const folderData = snapshot.val();
              await  handleFolderRenameStepDelete(folderRefPath,folderData);
            }
            }catch(e){
                console.log(e);
            }
        }
    }
    
    async function handleFolderRenameStepDelete(folderRefPath,data){
        if(location.pathname.includes(currentFolderName.replaceAll(' ','%20'))){
            navigateRouter('/');
        }
        await remove(folderRefPath).catch(e=>console.log(e))                
        await handleFolderRenameStepPush(data);
    }

    async function handleFolderRenameStepPush(data){                
        if(data){            
            const databaseFoldersRef = ref(database,`shoppingLists/${user.uid}/folders/${inputValue}`);
            await set(databaseFoldersRef,data);
            handleSetRenameFolderDialog(false);
            setShowPopup(false);
            if(currentFolderName === localStorage.getItem('landingRoute')?.slice(8)){
                localStorage.setItem('landingRoute','/');
            }
            renameFolderDialogInputRef.current.blur();
        }
    }

    function inputChangeHandler(val){
        setInputValue(val);
    }
    
    function handleFolderRenameKeyUp(key){
        if(key === 'Enter' && !renameBtnRef.current?.disabled){
            handleFolderRename();
        }
    }
    // console.log(renameBtnRef.current?.disabled);
    return(
        <div className='overlaying' onClick={(e)=>{
            e.stopPropagation()
        }}>
        <div className='rename-folder-dialog-div' ref={ref1} onClick={(e)=>e.stopPropagation()}>
        <fieldset>
            <legend>New name</legend>
            <input type="text" maxLength={25} ref={renameFolderDialogInputRef} onChange={(e)=>{
                inputChangeHandler(e.target.value)}
            } onClick={(e)=>e.stopPropagation()} value={inputValue} onKeyUp={(e)=>handleFolderRenameKeyUp(e.key)} />
        </fieldset>
        <div className="rename-folder-btn-wrapper">
            <button onClick={(e)=>{
                e.stopPropagation();
                handleSetRenameFolderDialog(false)}
            }>Cancel</button>
            <button  onClick={(e)=>{
                e.stopPropagation();
                handleFolderRename()
            }} disabled={!isNameChanged || inputValue==='' || folderNames.includes(inputValue)} ref={renameBtnRef}>Rename</button>
        </div>
        </div>
        </div>
    )
})
RenameFolderDialog.displayName='RenameFolderDialog';
RenameFolderDialog.propTypes={
    popupRenameButtonRef:PropTypes.object,
    currentFolderName:PropTypes.string,
    setShowPopup:PropTypes.func,
}
export default RenameFolderDialog;