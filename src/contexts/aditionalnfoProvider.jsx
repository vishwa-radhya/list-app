import { createContext,  useEffect, useState } from "react"
import { auth, database } from "../utils/firebase";
import {  onValue, ref } from "firebase/database";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";

export const AditionalInfoContext= createContext();

export const AditionalInfoProvider=({children})=>{

    const [storedPrivacyPin,setStoredPrivacyPin]=useState(null);

    useEffect(()=>{
        let unsubscribeFromDb=null;
        const fetchPrivacyPinFromDb=async(user)=>{
            
                const aditionalInfoInDbRef = ref(database,`shoppingLists/${user.uid}/additionalInfo/privacyPin`);
                unsubscribeFromDb = onValue(aditionalInfoInDbRef,(snapshot)=>{
                    if(snapshot.exists()){
                        setStoredPrivacyPin(...Object.values(snapshot.val()))
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
    // console.log("storedPrivacyPin:",storedPrivacyPin);
    
    return (
        <AditionalInfoContext.Provider value={{storedPrivacyPin}}>
            {children}
        </AditionalInfoContext.Provider>
    )
}
AditionalInfoProvider.propTypes={
    children:PropTypes.node,
}