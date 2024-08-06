import { Fragment, useEffect, useRef, useState } from "react"
import { onValue, ref, set } from "firebase/database";
import { auth, database } from '../utils/firebase.js';
import { isMobile } from "../utils/check-mobile.js";
import './shopping-list.styles.css';
import RenameContainer from "../rename/rename-container.component.jsx";
import DeleteButton from "../delete-button/delete-button.component.jsx";
import PropTypes from 'prop-types';

const ShoppingList=({isFavItemsOnly,dbReference,isFavOptionRequired})=>{
    const listRefs = useRef({});
    const starRefs = useRef({});
    const [items,setItems]=useState([]);
    const [refsLoaded,setRefsLoaded]=useState(false);
    const [clickedItemId,setClickedItemId]=useState(null);
    const [clickedItemName,setClickedItemName]=useState(null);
    const [isEditIconClicked,setIsEditIconClicked]=useState(false);
    const renameContainerRef = useRef(null);
    const user = auth.currentUser;
    
    useEffect(()=>{
        if(user){
            const shoppingListRef = ref(database,`shoppingLists/${user.uid}/${dbReference}`);
            onValue(shoppingListRef,(snapshot)=>{
                const data = snapshot.val();
                if(data){
                    let itemsArray = Object.entries(data).map(([id,{isFavorite,value}])=>({id,isFavorite,value}));
                    const newItemsArray = isFavItemsOnly ? itemsArray.filter(item=>item.isFavorite) : itemsArray;
                    setItems(newItemsArray);
                }else{
                    setItems([]);
                }
            });
        }
    },[user,isFavItemsOnly,dbReference]);
    
    function handleListOutSideClick(event){
        const listRefArray = Object.values(listRefs.current);
        const starRefArray = Object.values(starRefs.current);
        if((listRefArray.every(ref=>ref && !ref.contains(event.target))) && !renameContainerRef.current.contains(event.target) && (starRefArray.every(ref=>ref && !ref.contains(event.target))) ){
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
        for(const key in starRefs.current){
            if(starRefs.current[key] === null){
                delete starRefs.current[key];
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
    
    

    function showIcons(itemId,itemValue){
        setClickedItemId(clickedItemId === itemId ? null : itemId);
        setClickedItemName(clickedItemName === itemValue ? null : itemValue);
    }

    function handleSetClickedItemIdToNull(val){
        setClickedItemId(val);
        setClickedItemName(val);
    }

    function handleRenameIconClick(bool){
        setIsEditIconClicked(bool);
    }

    function handleRename(newName){
        if(clickedItemId){
            const itemRef = ref(database,`shoppingLists/${user.uid}/${dbReference}/${clickedItemId}`);
            const renameObject = isFavItemsOnly ? {value:newName,isFavorite:true} : {value:newName,isFavorite:false};
            set(itemRef,renameObject).then(()=>{
                setClickedItemName(newName);
                setIsEditIconClicked(false);
                setClickedItemId(null);
            }).catch((err)=>{
                console.log('error renaming item:',err);
            })
        }
    }

    function handleStarClick(fav){
        if(clickedItemId){
            const itemRef = ref(database,`shoppingLists/${user.uid}/${dbReference}/${clickedItemId}`);
            set(itemRef,{value:clickedItemName,isFavorite:!fav}).catch((e)=>console.log(e));
            setIsEditIconClicked(false);
        }
    }
    
    return(
        <Fragment>
        <ul id="shopping-list">
        {items.map((item)=>{
            
            const renameDivStyles={
                width:clickedItemId === item.id ? '50%' : '0',
            }
            const starDivStyles={
                width:clickedItemId === item.id ? 'auto' : '0',
                padding:clickedItemId === item.id ? '5px' : '0'
            }
           
           const renameIconClass = isMobile() ? 'rename-icon mobile' : 'rename-icon';
           const starIconClass = item.isFavorite ? 'fa-solid fa-star animate__animated animate__rubberBand' : 'fa-regular fa-star';
         return (
            <div className="list-wrapper" key={item.id}>
            {isFavOptionRequired && <div className={starIconClass} ref={el => starRefs.current[item.id]=el} style={starDivStyles} onClick={()=>handleStarClick(item.isFavorite)}></div>}
            <li 
                key={item.id}
                onClick={()=>showIcons(item.id,item.value)}
                ref={el => listRefs.current[item.id]=el}
                style={{outline: item.isFavorite  ? '2px solid #FADF6F' : '0',backgroundColor: isFavItemsOnly ? '#FCDA76' :'',maxWidth:item.value===undefined ? '0%' : '100%',padding:item.value===undefined?'0px':'15px'}}
                >
            <div 
                className={renameIconClass} 
                style={renameDivStyles} 
                onClick={(e)=>{
                    e.stopPropagation();
                    handleRenameIconClick(true)
                }
            }>
            <i 
                className="fa-regular fa-pen-to-square">
            </i>
            </div>
            {item.value}
            <DeleteButton itemId={item.id} setIsEditIconClicked={setIsEditIconClicked} clickedItemId={clickedItemId} dbReference={dbReference}  />
            </li>
            </div>
        );   
        })}
        </ul>
        <div ref={renameContainerRef}>
        <RenameContainer isEditIconClicked={isEditIconClicked} handleRenameIconClick={handleRenameIconClick} clickedItemName={clickedItemName} handleRename={handleRename} handleSetClickedItemIdToNull={handleSetClickedItemIdToNull} />
        </div>
        </Fragment>
    )
}
ShoppingList.propTypes={
    isFavItemsOnly:PropTypes.bool,
    dbReference:PropTypes.string,
    isFavOptionRequired:PropTypes.bool,
}
export default ShoppingList;
