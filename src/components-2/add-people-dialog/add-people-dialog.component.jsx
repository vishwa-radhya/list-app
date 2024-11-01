import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import './add-people-dialog.styles.css';
import PeopleImg2 from '../../assets/person-add-2.png'
import {  useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AditionalInfoContext } from '../../contexts/aditionalnfoProvider';
import { firestoreDatabase,auth } from '../../utils/firebase';
import { collection, getDocs, query,where,doc,setDoc } from 'firebase/firestore';
import Loader from '../../components-3/loader/loader.component';

const AddPeopleDialog=({addPeopleBtnRef,handleSetIsAddPeopleDialogOpen,isAddPeopleDialogOpen})=>{
    
    const addPeopleDialogRef = useRef(null);
    const [isUsernameNotFound,setIsUsernameNotFound]=useState(false);
    const [isFriendExists,setIsFriendExists]=useState(false);
    const {itemExchangeInfo}=useContext(AditionalInfoContext);
    const [inputValue,setInputValue]=useState("");
    const {userFriends,userName}=itemExchangeInfo;
    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
        if(isAddPeopleDialogOpen){
            const handleClickOutSide=(event)=>{
                if(addPeopleBtnRef.current && !addPeopleBtnRef.current.contains(event.target) && addPeopleDialogRef.current && !addPeopleDialogRef.current.contains(event.target)){
                    handleSetIsAddPeopleDialogOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutSide);
            return ()=>document.removeEventListener('click',handleClickOutSide);
        }
    },[addPeopleBtnRef,handleSetIsAddPeopleDialogOpen,isAddPeopleDialogOpen])

    const pushFriendToDb=async(friendUid,enteredValue,friendAvatarLetter)=>{
        try{
            await setDoc(doc(firestoreDatabase,"users",auth.currentUser.uid),{
                friends:{
                    [friendUid]:{userName:enteredValue,avatarLetter:friendAvatarLetter}
                }
            },{merge:true})
            setIsLoading(false);
            handleSetIsAddPeopleDialogOpen(false);
        }catch(e){
            alert('something went wrong! please try again after some time');
            setIsLoading(false);
            handleSetIsAddPeopleDialogOpen(false);
        }
    }

    const handleAddPeople=async()=>{
        setIsLoading(true);
        const enteredValue = inputValue.trim();
        try{
        if(enteredValue && (enteredValue !== userName)){
            const usersRef = collection(firestoreDatabase,"users");
            const userNameQuery = query(usersRef,where("userName","==",enteredValue));
            const querySnapShot = await getDocs(userNameQuery);
            const friendAvatarLetter = querySnapShot.docs[0].data().selectedAvatarLetter;
            if(!querySnapShot.empty){
                const friendUid = querySnapShot.docs[0].id;
                if(!Object.keys(userFriends).length){
                    pushFriendToDb(friendUid,enteredValue,friendAvatarLetter);
                    return;
                }else{
                    if(userFriends[friendUid]){
                        setIsFriendExists(true);
                        setIsLoading(false);
                        return;
                    }else{
                        pushFriendToDb(friendUid,enteredValue,friendAvatarLetter);
                        return;
                    }
                }
            }else{
                setIsUsernameNotFound(true);
                setIsLoading(false);
                return;
            }
        }
        }catch(e){
            setIsLoading(false);
            alert('something went wrong! please try again after some time');
            handleSetIsAddPeopleDialogOpen(false);
        }
        setIsLoading(false);
    }

    return(
        <div className='overlaying'>
        <div className='add-people-dialog' ref={addPeopleDialogRef}>
        <span className='no-user-found'>{isUsernameNotFound ? "No User Found.." : isFriendExists && "Friend Already Exists."}</span>
            <SvgWithLoader svgimg={PeopleImg2} svgWidth={140} />
            <label>Enter Username</label>
            <input type='text' spellCheck={false} onChange={
                (e)=>{
                    setInputValue(e.target.value)
                    if(isUsernameNotFound || isFriendExists){
                        setIsFriendExists(false);
                        setIsUsernameNotFound(false);
                    }
                    }
                } />
            <div className='btn-wrapper'>
                <button className='apd-add' onClick={handleAddPeople}>Add</button>
                <button className='apd-cancel' onClick={()=>handleSetIsAddPeopleDialogOpen(false)}>Cancel</button>
            </div>
            <div className='apd-loader-div'>
                {isLoading && <Loader/>}
            </div>
        </div>
        </div>
    )
}
AddPeopleDialog.propTypes ={
    addPeopleBtnRef:PropTypes.shape({
        current:PropTypes.instanceOf(Element)
    }),
    isAddPeopleDialogOpen:PropTypes.bool,
    handleSetIsAddPeopleDialogOpen:PropTypes.func,
}
export default AddPeopleDialog;