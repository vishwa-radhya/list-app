import { Fragment, useEffect, useState } from "react"
// import { shoppingListInDB,database } from "../utils/firebase";
import { onValue, ref, remove } from "firebase/database";
import { auth, database } from '../utils/firebase.js';
const ShoppingList=()=>{

    const [items,setItems]=useState([]);
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
    
    function handleRemove(itemId){
        // const exactLocationOfItemInDB = ref(database,`shoppingList/${itemId}`);
        // remove(exactLocationOfItemInDB).then(()=>{
        //     setItems((prevItems)=>prevItems.filter((item)=>item.id!==itemId));
        // }).catch((err)=>{
        //     console.error('error removing item: ',err);
        // })
        const itemRef = ref(database,`shoppingLists/${user.uid}/${itemId}`);
        remove(itemRef);
    }


    return(
        <Fragment>
        <ul id="shopping-list">
        {items.map((item)=>{
         return <li key={item.id} onClick={()=>handleRemove(item.id)}>{item.value}</li>   
        })}
        </ul>
        </Fragment>
    )
}
export default ShoppingList;