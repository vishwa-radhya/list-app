import './item-exchange.styles.css';
import PropTypes from 'prop-types';
import AvatarTile from '../avatar/avatar.component';
import { Fragment, useContext, useRef, useState } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import ChatImg from '../../assets/chatv.png';
import SentItemsImg from '../../assets/it-sent.svg';
import ReceivedItemsImg from '../../assets/it-received.svg';
import { FaUserMinus,FaUserPlus } from 'react-icons/fa6';
import NoPeople from '../../assets/people.png';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import AddPeopleDialog from '../../components-2/add-people-dialog/add-people-dialog.component';
import Avatar from 'boring-avatars';
import { IoIosRemoveCircle } from "react-icons/io";

const ItemExchange=()=>{
    
    const {itemExchangeInfo}=useContext(AditionalInfoContext);
    const {userName,selectedAvatar,userFriends}=itemExchangeInfo;
    const [isAddPeopleDialogOpen,setIsAddPeopleDialogOpen]=useState(false);
    const addPeopleBtnRef = useRef(null);
    const userFriendsArray = Object.values(userFriends);
    const [isRemovePeopleBtnClicked,setIsRemovePeopleBtnClicked]=useState(false);

    const handleSetIsAddPeopleDialogOpen=(bool)=>{
        setIsAddPeopleDialogOpen(bool);
    }
    
    const handleFriendRemoval=()=>{
        console.log('hit friend removal');
    }

    return(
        <div className='item-exchange-div animate__animated animate__fadeIn'>
           <div className='ied-intro-div'>
           <div className='img'>
            <img src={ChatImg} width={70} />
           </div>
            <div className='greet'>
                <span className='span-1'>Welcome,</span>
                <span className='span-2'>{userName}</span>
            </div>
            <div className='avatar'>
                <AvatarTile name={selectedAvatar} variant={"beam"} size={32} />
            </div>
           </div>
           <div className='btn-options'>
           <button className='add-receipents-btn it-btn' ref={addPeopleBtnRef} onClick={()=>handleSetIsAddPeopleDialogOpen(true)}><FaUserPlus />add</button>
           <button className='remove-receipents-btn it-btn' onClick={()=>{setIsRemovePeopleBtnClicked(prev=>!prev)}}><FaUserMinus />remove</button>
           </div>
           <div className='people'>
                {userFriendsArray.length ===0 ? <Fragment>
                <SvgWithLoader svgimg={NoPeople} svgWidth={200} />
                <span className='nrp'>No Receipents Yet!</span>
                </Fragment> : <div className='user-friends-div'>{userFriendsArray.map((obj,index)=>{
                    return <div key={`userFriends-${index}`}>
                    <Avatar name={`${obj.userName}-${index}`} variant='beam' square style={{borderRadius:"15%",boxShadow:'2px 2px 2px #ABACAB'}}  size={55} ></Avatar>
                    <span>{obj.userName}</span>
                    {isRemovePeopleBtnClicked && <IoIosRemoveCircle className='circle-remove' onClick={handleFriendRemoval} />}
                    </div>
                })}</div>}
           </div>
           <div className='options'>
            <div className='tile sent'>
                <img src={SentItemsImg} />
                <span>SENT</span>
            </div>
            <div className='tile received'>
                <img src={ReceivedItemsImg} />
                <span>RECEIVED</span>
            </div>
           </div>
           {isAddPeopleDialogOpen && <AddPeopleDialog addPeopleBtnRef={addPeopleBtnRef} handleSetIsAddPeopleDialogOpen={handleSetIsAddPeopleDialogOpen} isAddPeopleDialogOpen={isAddPeopleDialogOpen} />}
        </div>
    )
}
ItemExchange.propTypes={
    userName:PropTypes.string,
    selectedAvatar:PropTypes.string,
}
export default ItemExchange