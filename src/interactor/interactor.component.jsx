import { Fragment, useState } from "react"
import ShoppingList from "../shopping-list/shopping-list.component";
import { push,ref } from "firebase/database";
import { database,auth } from "../utils/firebase";
// import { shoppingListInDB } from "../utils/firebase"; 
const Interactor=()=>{
    const user= auth.currentUser;
    const [inputValue,setInputValue]=useState('');

    function inputChangeHandler(val){
        setInputValue(val);
    }

    function buttonClickHandler(){
        if(inputValue.trim().length){
            pushToDB();
        }
    }

    function clearInputField(){
        setInputValue('');
    }

    function keyUpHandler(key){
        if(key==='Enter' && inputValue.trim().length){
            pushToDB();
        }
    }

    function pushToDB(){
       const shoppingListRef = ref(database,`shoppingLists/${user.uid}`);
       push(shoppingListRef,inputValue);
       clearInputField();
    }

    return(
        <Fragment>
            <input type="text" name="" id="input-field" placeholder="Bread" value={inputValue} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>keyUpHandler(e.key)} />
            <button id="add-btn" onClick={buttonClickHandler}>Add To Cart</button>
            <ShoppingList/>
        </Fragment>
    )
}
export default Interactor;
