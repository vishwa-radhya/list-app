
import { useEffect, useState } from 'react';
import DialpadKey from '../dialpad-key/dialpad-key.component';
import './dialpad.styles.css';


const Dialpad = () => {

    const [inputValue,setInputValue]=useState('');
    const [maskedInput,setMaskedInput]=useState('');

   const hanldeInputChange=(value)=>{
    if(inputValue.length<4) setInputValue(prev=>prev+value);
   }

   useEffect(()=>{
            setMaskedInput(inputValue.slice(0,inputValue.length-1).replace(/./g,'●')+inputValue.slice(inputValue.length-1));
    
   },[inputValue])

   const hanldeInputDelete=()=>{
    setInputValue(prev=>prev.slice(0,prev.length-1));
    setMaskedInput(prevMaskedValue=>prevMaskedValue.slice(0,prevMaskedValue.length-1));
   }

    return (
        <div className='dialpad-div'>
            <input  value={maskedInput} maxLength={4} readOnly></input>
            <div className='dialpad'>
                <DialpadKey num={'1'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'2'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'3'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'4'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'5'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'6'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'7'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'8'} setInputValue={hanldeInputChange} />
                <DialpadKey num={'9'} setInputValue={hanldeInputChange} />
                <div onClick={hanldeInputDelete}><i className='fa-solid fa-delete-left'></i></div>
                <DialpadKey num={'0'} setInputValue={hanldeInputChange} />
                <div><span>OK</span></div>
            </div>
        </div>
    );
};


export default Dialpad;