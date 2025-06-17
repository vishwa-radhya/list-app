import PropTypes from 'prop-types';
import './invoice-list.styles.css'
import { useContext, useEffect, useRef, useState } from 'react';
import ListLoader from '../../components-3/list-loader/list-loader.component';
import { auth, database } from '../../utils/firebase';
import { isMobile } from '../../utils/check-mobile';
import { ListItemsContext } from '../../contexts/list-items-context';
import { FaRegPenToSquare } from 'react-icons/fa6';
import DeleteButton from '../../components-2/delete-button/delete-button.component';
import { onValue, ref, update } from 'firebase/database';
import RenameContainer from '../../components-2/rename/rename-container.component';

const InvoiceList = ({dbReference}) => {

    const [contentLoaded,setContentLoaded]=useState(true);
    const listRefs=useRef({});
    const user = auth.currentUser;
    const {items,handleSetItems,handleSetMarkerValue}=useContext(ListItemsContext);
    const [refsLoaded,setRefsLoaded]=useState(false);
    const [clickedItemId,setClickedItemId]=useState(null);
    const [clickedItem,setClickedItem]=useState({name:null,price:null});
    const [isEditIconClicked,setIsEditIconClicked]=useState(false);
    const renameContainerRef = useRef(null);

    useEffect(()=>{
        let unsubscribeFromDb=null;
        if(user){
            const invoiceListRef = ref(database,`shoppingLists/${user.uid}/${dbReference}`);
            unsubscribeFromDb=onValue(invoiceListRef,(snapshot)=>{
                setContentLoaded(true)
                const data = snapshot.val();
                if(data){
                    if(data.marker) handleSetMarkerValue(data.marker);
                    let itemsArray = Object.entries(data).map(([id,{value,price}])=>({id,value,price}));                    
                    if(dbReference.includes('folders')){
                        itemsArray=itemsArray.filter(item=>item.id!=='marker' && item.id!=='folderInstanceType')
                    }
                    handleSetItems(itemsArray)
                }else{
                    handleSetItems([])
                }
                setContentLoaded(false)
            })
        }
        return ()=>{if(unsubscribeFromDb)unsubscribeFromDb()}
    },[user,dbReference,handleSetItems,handleSetMarkerValue])

    function showIcons(itemId,itemValue,itemPrice){
        setClickedItemId(clickedItemId === itemId ? null : itemId);
        const setName = clickedItem?.name === itemValue ? null : itemValue;
        const setPrice = clickedItem?.price === itemPrice ? null : itemPrice;
        setClickedItem({name:setName,price:setPrice});
    }

     function handleListOutSideClick(event){
        const listRefArray = Object.values(listRefs.current);
        if((listRefArray.every(ref=>ref && !ref.contains(event.target))) && !renameContainerRef.current.contains(event.target)){
            setClickedItemId(null);
            setIsEditIconClicked(false);
            setClickedItem({name:null,price:null});   
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

    function handleRenameIconClick(bool){
        setIsEditIconClicked(bool);
    }

    function removeNullListsRefs(){
        for(const key in listRefs.current){
            if(listRefs.current[key] === null){
                delete listRefs.current[key];
            }
        }
    }
    function handleSetClickedItemIdToNull(val){
        setClickedItemId(val);
        setClickedItem({name:null,price:null});
    }

    function handleRename(newName,newPrice){
        if(clickedItemId){
            let updates={}
            if(newName?.trim() !== clickedItem.name?.trim()){
                updates.value=newName?.trim()
            }
            if(newPrice?.trim() !== clickedItem.price?.trim()){
                updates.price=newPrice?.trim()
            }
            if(Object.keys(updates).length){
                const itemRef = ref(database,`shoppingLists/${user.uid}/${dbReference}/${clickedItemId}`);
                update(itemRef,updates).then(()=>{
                    setClickedItem({name:null,price:null});
                    setIsEditIconClicked(false);
                    setClickedItemId(null);
                }).catch((e)=>{
                    console.error('error renaming invoice items',e)
                })
            }
        }
    }

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

    return (  
        <div className='invoice-list-component'>
            {contentLoaded ? <ListLoader style={{width:"300px"}} /> : <div className='tiles'>
                <ul>
                    {items.map((item)=>{
                        const renameDivStyles={
                            width:clickedItemId === item.id ? '50%' : '0'
                        }
                        const renameIconClass = isMobile() ? 'rename-icon mobile' : 'rename-icon';
                        return(
                            <div className='list-wrapper' key={item.id}>
                                <li key={item.id} onClick={()=>showIcons(item?.id,item?.value,item?.price)}
                                   ref={el=>listRefs.current[item.id]=el}>
                                <div className={renameIconClass} style={renameDivStyles} onClick={(e)=>{
                                    e.stopPropagation();
                                    handleRenameIconClick(true)
                                }}>
                                <FaRegPenToSquare className='li-pts'></FaRegPenToSquare>
                                </div>
                                {item.value}
                                <div className='price-div'>{item.price}</div>
                                <DeleteButton itemId={item.id} setIsEditIconClicked={setIsEditIconClicked} clickedItemId={clickedItemId} dbReference={dbReference} />
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>}
            <div ref={renameContainerRef}>
            {isEditIconClicked && <RenameContainer isEditIconClicked={isEditIconClicked} handleRenameIconClick={handleRenameIconClick} clickedItemName={clickedItem.name} clickedItemPrice={clickedItem.price} handleRename={handleRename} handleSetClickedItemIdToNull={handleSetClickedItemIdToNull} folderType={'invoice'} />}
            </div>
        </div>
    );
}
InvoiceList.propTypes={
    dbReference:PropTypes.string
}
export default InvoiceList;