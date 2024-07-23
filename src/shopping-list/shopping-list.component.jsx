import { Fragment, useEffect, useRef, useState } from "react"
import { onValue, ref, remove,set } from "firebase/database";
import { auth, database } from '../utils/firebase.js';
import { isMobile } from "../utils/check-mobile.js";
import './shopping-list.styles.css';
import RenameContainer from "../rename/rename-container.component.jsx";
const ShoppingList=()=>{
    const listRefs = useRef({});
    const [items,setItems]=useState([]);
    const [refsLoaded,setRefsLoaded]=useState(false);
    const [clickedItemId,setClickedItemId]=useState(null);
    const [clickedItemName,setClickedItemName]=useState(null);
    const [isEditIconClicked,setIsEditIconClicked]=useState(false);
    const renameContainerRef = useRef(null);
    const user = auth.currentUser;

    useEffect(()=>{
        if(user){
            const shoppingListRef = ref(database,`shoppingLists/${user.uid}`);
            onValue(shoppingListRef,(snapshot)=>{
                const data = snapshot.val();
                if(data){
                    const itemsArray = Object.entries(data).map(([id,value])=>({id,value}));
                    setItems(itemsArray);
                }else{
                    setItems([]);
                }
            });
        }
    },[user]);

    function handleListOutSideClick(event){
        const refArray = Object.values(listRefs.current);
        if((refArray.every(ref=>ref && !ref.contains(event.target))) && !renameContainerRef.current.contains(event.target)){
            setClickedItemId(null);
            setIsEditIconClicked(false);
        }
    }

    function removeNullListsRefs(){
        for(const key in listRefs.current){
            if(listRefs.current[key] === null){
                delete listRefs.current[key];
            }
        }
    }

    useEffect(()=>{
        if(items.length>0){
            setRefsLoaded(true);
        }
    },[items]);

    useEffect(()=>{
        if(refsLoaded){
            removeNullListsRefs();
            setRefsLoaded(false);
        }
    },[refsLoaded]);


    useEffect(()=>{
        if (clickedItemId) {
            document.addEventListener('click', handleListOutSideClick);
        } else {
            document.removeEventListener('click', handleListOutSideClick);
        }
        return () => {
            document.removeEventListener('click', handleListOutSideClick);
        };
    },[clickedItemId]);
    
    function handleRemove(itemId){
        const itemRef = ref(database,`shoppingLists/${user.uid}/${itemId}`);
        remove(itemRef);
        setIsEditIconClicked(false);
    }

    function showIcons(itemId,itemValue){
        setClickedItemId(clickedItemId === itemId ? null : itemId);
        setClickedItemName(clickedItemName === itemValue ? null : itemValue);
    }

    function handleSetClickedItemIdToNull(bool){
        setClickedItemId(bool);
    }

    function handleRenameIconClick(bool){
        setIsEditIconClicked(bool);
    }

    function handleRename(newName){
        if(clickedItemId){
            const itemRef = ref(database,`shoppingLists/${user.uid}/${clickedItemId}`);
            set(itemRef,newName).then(()=>{
                setClickedItemName(newName);
                setIsEditIconClicked(false);
                setClickedItemId(null);
            }).catch((err)=>{
                console.log('error renaming item:',err);
            })
        }
    }

    return(
        <Fragment>
        <ul id="shopping-list">
        {items.map((item)=>{
            const deleteDivStyles={
                width:clickedItemId === item.id ? '50%' : '0',
            }
            const renameDivStyles={
                width:clickedItemId === item.id ? '50%' : '0',
            }
           const deleteIconClass = isMobile() ? 'delete-icon mobile' : 'delete-icon';
           const renameIconClass = isMobile() ? 'rename-icon mobile' : 'rename-icon';
         return (
            <li key={item.id} onClick={()=>showIcons(item.id,item.value)} ref={el => listRefs.current[item.id]=el}><div className={renameIconClass} style={renameDivStyles} onClick={(e)=>{
                e.stopPropagation();
                handleRenameIconClick(true)
            }}><i className="fa-regular fa-pen-to-square"></i></div>{item.value}<div className={deleteIconClass} style={deleteDivStyles}  onClick={(e)=>{
            e.stopPropagation()
            handleRemove(item.id)
        }}><i className="fa-regular fa-trash-can" ></i></div></li>
    );   
        })}
        </ul>
        <div ref={renameContainerRef}>
        <RenameContainer isEditIconClicked={isEditIconClicked} handleRenameIconClick={handleRenameIconClick} clickedItemName={clickedItemName} handleRename={handleRename} handleSetClickedItemIdToNull={handleSetClickedItemIdToNull} />
        </div>
        </Fragment>
    )
}
export default ShoppingList;