import { useState } from 'react';
import './item-exchange-sender.styles.css';
import { FaXmark } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { firestoreDatabase } from '../../utils/firebase';
import { AuthContext } from '../../contexts/authContext';
import { doc,serverTimestamp,collection,writeBatch } from 'firebase/firestore';

const ItemExchangeSender=({setIsSelectReceipentDialogOpen,selectedFriend,setSelectedFriend})=>{

    const [isSenderBtnClicked,setIsSenderBtnClicked]=useState(false);
    const [itemName,setItemName]=useState('');
    const {itemExchangeInfo}=useContext(AditionalInfoContext);
    const {userFriends,userName,selectedAvatar}=itemExchangeInfo;
    const {user} = useContext(AuthContext);

    const handleItemSend =async()=>{
        const trimedItemName = itemName.trim();
        if(trimedItemName && selectedFriend){
            const sentRef = collection(firestoreDatabase,'messages',user.uid,'sent');
            const receiver = Object.entries(userFriends).find(([,{userName}])=>userName === selectedFriend)
            const receiverUid = receiver?.[0]
            const receiverAvatarLetter = receiver?.[1].avatarLetter
            const receiveref = collection(firestoreDatabase,'messages',receiverUid,'received')
            const senderMessageData={
                content:trimedItemName,
                receiver:selectedFriend,
                avatarLetter:receiverAvatarLetter,
                timeStamp:serverTimestamp(),
            }
            const receiverMessageData={
                content:trimedItemName,
                sender:userName,
                avatarLetter:selectedAvatar,
                timeStamp:serverTimestamp(),
            }
            const batch = writeBatch(firestoreDatabase);
            try{
                batch.set(doc(sentRef),senderMessageData);
                batch.set(doc(receiveref),receiverMessageData);
                await batch.commit();   
                resetFields()
            }catch(e){
                console.error('error sending from item sender batch error ',e)
            }
        }
    }

    function resetFields(){
        setItemName('')
        setSelectedFriend('')
    }

    return(
        <div className='ie-sender-div'>
            {!isSenderBtnClicked ? <button className='sender-btn' onClick={()=>setIsSenderBtnClicked(true)} >Send Items</button> : <div className='sender-options animate__animated animate__fadeInUp'>
                        <div className='head'>
                            <FaXmark  className='xmark' onClick={()=>setIsSenderBtnClicked(false)} />
                        </div>
                        <div className='body'>
                            <div className='label-input'>
                            <label>Item name</label>
                            <input type='text' spellCheck={false} value={itemName} onChange={(e)=>setItemName(e.target.value)} maxLength={40} ></input>
                            </div>
                            <button className='select-receipents-btn' onClick={()=>setIsSelectReceipentDialogOpen(true)} >Select Receipents</button>
                            <div className='receipents'>
                                {selectedFriend ? selectedFriend : 'none'}
                            </div>
                        </div>
                <button className='sender-btn' onClick={handleItemSend}>Send Items</button>
            </div>}
        </div>
    )
}
ItemExchangeSender.propTypes={
    setIsSelectReceipentDialogOpen:PropTypes.func,
    selectedFriend:PropTypes.string,
    setSelectedFriend:PropTypes.func,
}
export default ItemExchangeSender;