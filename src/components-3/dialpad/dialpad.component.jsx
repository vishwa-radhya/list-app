
import {  useContext, useState } from 'react';
import DialpadKey from '../dialpad-key/dialpad-key.component';
import './dialpad.styles.css';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import PropTypes from 'prop-types';

const Dialpad = ({handleSetIsVerified}) => {

    const [inputValue,setInputValue]=useState('');
    const [maskedInput,setMaskedInput]=useState('');
    const {storedPrivacyPin}=useContext(AditionalInfoContext);
    const [isIncorrectPin,setIsIncorrectPin]=useState(false);

   const hanldeInputChange=(value)=>{
    if(inputValue.length<4){
         setInputValue(prev=>prev+value);
         setMaskedInput((prev)=>{
            const maskedValue = prev+value;
            return maskedValue.slice(0,maskedValue.length-1).replace(/./g,'●')+maskedValue.slice(maskedValue.length-1)
         })
         if(isIncorrectPin)setIsIncorrectPin(false)
        }
   }

   const hanldeInputDelete=()=>{
    setInputValue(prev=>prev.slice(0,prev.length-1));
    setMaskedInput(prevMaskedValue=>prevMaskedValue.slice(0,prevMaskedValue.length-1));
    if(isIncorrectPin)setIsIncorrectPin(false)
   }

   const handleOkClick=()=>{
        if(inputValue === storedPrivacyPin){
            handleSetIsVerified(true);
        }else{
            setIsIncorrectPin(true);
        }
   }
//    console.log('render');
   
    return (
        <div className='dialpad-div'>
        {isIncorrectPin && <span className='incorrect-span'>Incorrect PIN entered</span>}
            <input  value={maskedInput} maxLength={4} readOnly ></input>
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
                <div onClick={handleOkClick}><span>OK</span></div>
            </div>
        </div>
    );
};
Dialpad.propTypes={
    handleSetIsVerified:PropTypes.func,
}

export default Dialpad;