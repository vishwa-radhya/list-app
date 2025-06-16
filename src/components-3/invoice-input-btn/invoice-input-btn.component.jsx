import { useContext, useEffect, useState } from 'react';
import './invoice-input-btn.styles.css';
import PropTypes from 'prop-types';
import { auth, database } from '../../utils/firebase';
import { push, ref } from 'firebase/database';
import { ListItemsContext } from '../../contexts/list-items-context';

const InvoiceInputBtn = ({placeHolder,buttonText,dbReference}) => {
    const [inputValue,setInputValue]=useState('');
    const [priceValue,setPriceValue]=useState('');
    const [totalPrice,setTotalPrice]=useState('');
    const {items}=useContext(ListItemsContext);
    const user= auth.currentUser;

    useEffect(()=>{
        setTotalPrice(items.reduce((acc, item) => acc + Number(item.price), 0))
    },[items])

    function keyUpHandler(key){
        if(key==='Enter' && inputValue.trim().length && priceValue.trim().length){
            pushToDB();
        }
    }

    function buttonClickHandler(){
        if(inputValue.trim().length && priceValue.trim().length){
            pushToDB();  
        }
    }

    function pushToDB(){
        const shoppingListRef = ref(database,`shoppingLists/${user.uid}/${dbReference}`);
        push(shoppingListRef,{value:inputValue.trim(),price:priceValue.trim()});
        clearInputField()
    }

    function clearInputField(){
        setInputValue('');
        setPriceValue('');
    }

    return ( 
        <div className='invoice-input-btn-container'>
            <div className='total'>
                <h4>Total= {totalPrice}</h4>
            </div>
            <input type='text' name='' maxLength={45} placeholder={placeHolder} onChange={(e)=>setInputValue(e.target.value)} required onKeyUp={(e)=>keyUpHandler(e.key)} className='input-text-field' value={inputValue} />
            <div className='group-field'>
                <input type='number' name='' maxLength={15} value={priceValue} placeholder='Enter Price' onChange={(e)=>setPriceValue(e.target.value)} onKeyUp={(e)=>keyUpHandler(e.key)} required />
                <button onClick={buttonClickHandler}>{buttonText}</button>
            </div>
        </div>
     );
}
InvoiceInputBtn.propTypes={
    placeHolder:PropTypes.string,
    buttonText:PropTypes.string,
    dbReference:PropTypes.string,
}
export default InvoiceInputBtn;