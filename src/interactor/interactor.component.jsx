import { Fragment, useState } from "react"
import ShoppingList from "../shopping-list/shopping-list.component";
import { push } from "firebase/database";
import { shoppingListInDB } from "../utils/firebase"; 
const Interactor=()=>{

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
        push(shoppingListInDB,inputValue);
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
