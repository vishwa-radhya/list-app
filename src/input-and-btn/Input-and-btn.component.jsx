import { Fragment } from "react";
import { useState } from "react";
import { push,ref } from "firebase/database";
import { database } from "../utils/firebase";
import { auth } from "../utils/firebase";
import './input-and-btn.styles.css';
import PropTypes from 'prop-types';
const InputAndBtn=({placeHolder,buttonText,pushAsFav})=>{

    const [inputValue,setInputValue]=useState('');
    const user= auth.currentUser;


    function inputChangeHandler(val){
        setInputValue(val);
    }

    function keyUpHandler(key){
        if(key==='Enter' && inputValue.trim().length){
            pushToDB();
        }
    }

    function pushToDB(){
        const shoppingListRef = ref(database,`shoppingLists/${user.uid}/home`);
        if(!pushAsFav){
            push(shoppingListRef,{value:inputValue,isFavorite:false});
        }else{
            push(shoppingListRef,{value:inputValue,isFavorite:true});
        }
        clearInputField();
     }

     function clearInputField(){
        setInputValue('');
    }

    function buttonClickHandler(){
        if(inputValue.trim().length){
            pushToDB();
        }
    }

    return(
        <Fragment>
        <input type="text" name="" id="input-field" maxLength={35} placeholder={placeHolder} value={inputValue} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>keyUpHandler(e.key)} />
            <button id="add-btn" onClick={buttonClickHandler}>{buttonText}</button>
            </Fragment>
    )
}
InputAndBtn.propTypes={
    placeHolder:PropTypes.string,
    buttonText:PropTypes.string,
    pushAsFav:PropTypes.bool,
}
export default InputAndBtn;