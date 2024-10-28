import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import './item-transfer.styles.css';
import TransferImage from '../../assets/chatv.png';
import { Fragment, useContext, useRef, useState } from 'react';
import AvatarTile from '../avatar/avatar.component';
import { collection, doc,getDocs,query,setDoc, where } from 'firebase/firestore';
import {auth,firestoreDatabase} from '../../utils/firebase.js';
import ItemExchange from '../item-exchange/item-exchange.component.jsx';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider.jsx';
import { FaCircleXmark } from 'react-icons/fa6';


const ItemTransfer = () => {

    const [isGetStartedClicked,setIsGetStartedClicked]=useState(false);
    const [selectedAvatar,setSelectedAvatar]=useState('');
    const getStartedInputRef = useRef(null);
    const {itemExchangeInfo} = useContext(AditionalInfoContext);
    const {userName}=itemExchangeInfo;
    const [isSimilarUsernameExists,setIsSimilarUsernameExists]=useState(false);
    
    const handleSetUserIdForItemExchange=async()=>{

        const enteredUserName = getStartedInputRef.current.value.trim();

        if(selectedAvatar && enteredUserName){
            try{
                const usersCollectionRef = collection(firestoreDatabase,"users");
                const userNameQuery = query(usersCollectionRef,where("userName","==",enteredUserName));
                const querySnapShot = await getDocs(userNameQuery);
                if(!querySnapShot.empty){
                    setIsSimilarUsernameExists(true);
                }else{   
                    const userDocRef =doc(firestoreDatabase,"users",auth.currentUser.uid);
                    await setDoc(userDocRef,{
                        userName:enteredUserName,
                        email:auth.currentUser.email,
                        selectedAvatarLetter:selectedAvatar,
                        friends:{},
                    })
                }
        }catch(e){
            console.log('error occured while creating user doc in firestore')
        }
        }
    }

    const inputChangeHandler=()=>{
        if(isSimilarUsernameExists)setIsSimilarUsernameExists(false)
    }

    return (
        <Fragment>
        {!userName ? <div className='item-transfer-div animate__animated animate__fadeIn'>
            <SvgWithLoader svgimg={TransferImage} svgWidth={130}  />
            <p style={{fontWeight:'550'}}>Item Exchange</p>
             <button className='black-btn' onClick={()=>setIsGetStartedClicked(true)}>Get Started</button>
            {isGetStartedClicked && <div className='it-form'>
                <label>Enter a user name</label>
                <input type='text' spellCheck='false' maxLength={15} ref={getStartedInputRef} onChange={inputChangeHandler} />
                <div className='username-exist-indicator-div'>
               {isSimilarUsernameExists && <span> <FaCircleXmark style={{color:'#e93317'}} />  similar username exists. </span>}
                </div>
                <label>Select an avatar</label>
                <div className='avatars-div'>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('a')}>
                <AvatarTile name='a' variant='beam' size={39} selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('b')}>
                <AvatarTile name='b' variant='beam' size={39} selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('c')}>
                <AvatarTile name='c' variant='beam' size={39} selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('d')}>
                <AvatarTile name='d' variant='beam' size={39} selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('e')}>
                <AvatarTile name='e' variant='beam' size={39} selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('f')}>
                <AvatarTile name='f'  size={39} variant='beam' selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('g')}>
                <AvatarTile name='g'  size={39} variant='beam' selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('h')}>
                <AvatarTile name='h'  size={39} variant='beam' selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('i')}>
                <AvatarTile name='i'  size={39} variant='beam' selectedAvatar={selectedAvatar} />
                </div>
                <div className='avatar-tile' onClick={()=>setSelectedAvatar('j')}>
                <AvatarTile name='j'  size={39} variant='beam' selectedAvatar={selectedAvatar} />
                </div>  
                </div>
                <button className='black-btn' onClick={handleSetUserIdForItemExchange}>Complete</button>
            </div>}
        </div>:<ItemExchange/> }
        </Fragment>
    );
};

export default ItemTransfer;