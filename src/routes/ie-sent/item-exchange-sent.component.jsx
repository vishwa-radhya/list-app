import { useContext, useEffect, useState } from 'react';
import ItemExchangeHeader from '../../components-3/ie-header/item-exchange-header.component';
import ItemExchangeSender from '../../components-4/ie-sender/item-exchange-sender.component';
import './item-exchange-sent.styles.css';
import { FaXmark } from 'react-icons/fa6';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import Avatar from 'boring-avatars';
import PropTypes from 'prop-types';
import ItemExchangeMap from '../../components-4/ie-map/item-exchange-map.component';

const ItemExchangeSent=()=>{

    const [isSelectReceipentDialogOpen,setIsSelectReceipentDialogOpen] =useState(false);
    const [selectedFriend,setSelectedFriend]=useState('');

    return(
        <div className='animate__animated animate__fadeIn ie-sent-div'>
            <ItemExchangeHeader/>
            { isSelectReceipentDialogOpen && <SelectReceipentDialog setIsSelectReceipentDialogOpen={setIsSelectReceipentDialogOpen} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />}
            <ItemExchangeMap fetchAt={'sent'} role={'receiver'} />
            <ItemExchangeSender setIsSelectReceipentDialogOpen={setIsSelectReceipentDialogOpen} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
        </div>
    )
}
export default ItemExchangeSent;

const SelectReceipentDialog=({setIsSelectReceipentDialogOpen,setSelectedFriend,selectedFriend})=>{

    const {itemExchangeInfo}=useContext(AditionalInfoContext);
    const {userFriends}=itemExchangeInfo;
    const [userFriendsMap,setUserFriendsMap]=useState([]);

    useEffect(()=>{
        setUserFriendsMap(Object.entries(userFriends).map(([fUID,{userName,avatarLetter}])=>({fUID,userName,avatarLetter})))
    },[userFriends]);
    
    
    return(
        <div className='overlaying'>
        <div className='select-receipent-dialog-div'>
            <div className='head'>
                <span>select receipents</span>
                <FaXmark className='xmark' onClick={()=>setIsSelectReceipentDialogOpen(false)} />
            </div>
            <div className='receipents-avatars'>
                {userFriendsMap.map((obj,index)=>{
                    return <div key={`srdd-${index}`} className='tile' onClick={()=>setSelectedFriend(obj.userName)} style={{backgroundColor:selectedFriend === obj.userName ? '#E4E4E3' : ''}}>
                        <Avatar name={obj.avatarLetter} variant='beam' size={55} />
                        <span>{obj.userName}</span>
                    </div>
                })}
            </div>
            <button onClick={()=>{
                selectedFriend && setIsSelectReceipentDialogOpen(false)
            }}>Confirm</button>
        </div>
        </div>
    )
}
SelectReceipentDialog.propTypes={
    setIsSelectReceipentDialogOpen:PropTypes.func,
    selectedFriend:PropTypes.string,
    setSelectedFriend:PropTypes.func,
}