import { Fragment, useState } from "react"
import ShoppingList from "./shopping-list";
import { push } from "firebase/database";
import { shoppingListInDB } from "./utils/firebase"; 
const Interactor=()=>{

    const [inputValue,setInputValue]=useState('');

    function inputChangeHandler(val){
        setInputValue(val);
    }

    function buttonClickHandler(){
        push(shoppingListInDB,inputValue);
        clearInputField();
    }

    function clearInputField(){
        setInputValue('');
    }

    return(
        <Fragment>
            <input type="text" name="" id="input-field" placeholder="Bread" value={inputValue} onChange={(e)=>inputChangeHandler(e.target.value)} />
            <button id="add-btn" onClick={buttonClickHandler}>Add To Cart</button>
            <ShoppingList/>
        </Fragment>
    )
}
export default Interactor;