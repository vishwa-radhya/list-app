import { createContext,  useEffect, useState } from "react"
import { auth, database,firestoreDatabase } from "../utils/firebase";
import {  onValue, ref } from "firebase/database";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";
import {doc,onSnapshot} from 'firebase/firestore';

export const AditionalInfoContext= createContext();

export const AditionalInfoProvider=({children})=>{

    const [storedPrivacyPin,setStoredPrivacyPin]=useState(null);
    const [itemExchangeInfo,setItemExchangeInfo]=useState( {userName:null,selectedAvatar:null,userFriends:{}});

    useEffect(()=>{
        let unsubscribeFromDb=null;
        const fetchPrivacyPinFromDb=async(user)=>{
            
                const aditionalInfoInDbRef = ref(database,`shoppingLists/${user.uid}/additionalInfo/privacyPin`);
                unsubscribeFromDb = onValue(aditionalInfoInDbRef,(snapshot)=>{
                    if(snapshot.exists()){
                        setStoredPrivacyPin(snapshot.val())
                    }else{
                        setStoredPrivacyPin(null);
                    }
                })
        }
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                fetchPrivacyPinFromDb(user);
            }
        })

        return ()=>{
            unsubscribe();
            if(unsubscribeFromDb) unsubscribeFromDb();
        }

    },[storedPrivacyPin])
    

    useEffect(()=>{
        let unsubscribeFromFirestore = null;

        const fetchItemExchangeInfo = async(user)=>{
            try{
                const itemExchangeInfoRef = doc(firestoreDatabase,"users",user.uid)

                unsubscribeFromFirestore = onSnapshot (itemExchangeInfoRef,(userSnapshot)=>{
                    if(userSnapshot.exists()){
                        const {userName,selectedAvatarLetter,friends}= userSnapshot.data()
                        setItemExchangeInfo({userName:userName,selectedAvatar:selectedAvatarLetter,userFriends:friends})
                    }else{
                        setItemExchangeInfo({userName:null,selectedAvatar:null});
                    }
                })
                
            }catch(e){
                console.log('error occured when fetching user data from firestore')
            }
        }

        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                fetchItemExchangeInfo(user);
            }
        })
        return ()=>{
            unsubscribe()
            if(unsubscribeFromFirestore)unsubscribeFromFirestore();
        }
    },[])
    
    return (
        <AditionalInfoContext.Provider value={{storedPrivacyPin,itemExchangeInfo}}>
            {children}
        </AditionalInfoContext.Provider>
    )
}
AditionalInfoProvider.propTypes={
    children:PropTypes.node,
}