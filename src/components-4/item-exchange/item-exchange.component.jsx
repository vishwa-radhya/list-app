import './item-exchange.styles.css';
import PropTypes from 'prop-types';
import AvatarTile from '../avatar/avatar.component';
import { useContext } from 'react';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import ChatImg from '../../assets/chatv.png';
import SentItemsImg from '../../assets/it-sent.svg';
import ReceivedItemsImg from '../../assets/it-received.svg';
import { FaPlus } from 'react-icons/fa6';
import NoPeople from '../../assets/people.png';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';

const ItemExchange=()=>{
    
    const {itemExchangeInfo}=useContext(AditionalInfoContext);
    const {userName,selectedAvatar}=itemExchangeInfo;
    
    return(
        <div className='item-exchange-div animate__animated animate__fadeIn'>
           <div className='ied-intro-div'>
           <div className='img'>
            <img src={ChatImg} width={70} />
           </div>
            <div className='greet'>
                <span className='span-1'>Welcome,</span>
                <span className='span-2'>{userName.slice(0,1).toUpperCase()+userName.slice(1)}</span>
            </div>
            <div className='avatar'>
                <AvatarTile name={selectedAvatar} variant={"beam"} size={32} />
            </div>
           </div>
           <button className='add-receipents'><FaPlus style={{position:"relative",top:'-1.5px'}} /> Add Receipents</button>
           <div className='people'>
                <SvgWithLoader svgimg={NoPeople} svgWidth={200} />
                <span>No Receipents Yet!</span>
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
        </div>
    )
}
ItemExchange.propTypes={
    userName:PropTypes.string,
    selectedAvatar:PropTypes.string,
}
export default ItemExchange