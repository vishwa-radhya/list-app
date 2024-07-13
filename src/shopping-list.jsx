import { Fragment, useEffect, useState } from "react"
import { shoppingListInDB,database } from "./utils/firebase";
import { onValue, ref, remove } from "firebase/database";
const ShoppingList=()=>{

    const [items,setItems]=useState([]);

    

    useEffect(()=>{

        const unsubscribe = onValue(shoppingListInDB,(snapshot)=>{
            if(snapshot.exists()){
                const itemsArray = Object.entries(snapshot.val()).map(([id,value])=>({id,value}));
                setItems(itemsArray);
            }else{
                setItems([]);
            }
        });

        return ()=> unsubscribe();
    },[]);
    
    function handleRemove(itemId){
        const exactLocationOfItemInDB = ref(database,`shoppingList/${itemId}`);
        remove(exactLocationOfItemInDB).then(()=>{
            setItems((prevItems)=>prevItems.filter((item)=>item.id!==itemId));
        }).catch((err)=>{
            console.error('error removing item: ',err);
        })
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