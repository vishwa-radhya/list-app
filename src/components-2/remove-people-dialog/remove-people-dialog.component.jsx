import PropTypes from "prop-types";
import './remove-people-dialog.styles.css';
import Avatar from "boring-avatars";
import { doc,updateDoc,deleteField } from 'firebase/firestore';
import { auth,firestoreDatabase } from "../../utils/firebase";

const RemovePeopleDialog=({handleSetIsRemovePeopleDialogOpen,removalObject})=>{

    const handleFriendRemoval=async(friendUID)=>{
        try{
            const userDocRef = doc(firestoreDatabase,"users",auth.currentUser.uid);
            await updateDoc(userDocRef,{
                [`friends.${friendUID}`]:deleteField()
            })
        }catch(e){
            console.error('error occured during friend removal:',e);
            alert('unexpected error occured try again after some time.')
        }
    }

    return(
        <div className="overlaying">
            <div className="rpd">
                <p>Remove Friend ?</p>
                <div className="friend">
                    <Avatar variant="beam" name={removalObject.avatarLetter} square style={{borderRadius:"5%",boxShadow:'2px 2px 2px #ABACAB'}}  size={60} />
                    <span>{removalObject.userName}</span>
                </div>
                <div className="btn-wrapper">
                <button className='rpd-remove' onClick={()=>{
                    handleFriendRemoval(removalObject.fUID)
                    handleSetIsRemovePeopleDialogOpen(false);
                }}>Remove</button>
                <button className='rpd-cancel' onClick={()=>handleSetIsRemovePeopleDialogOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
RemovePeopleDialog.propTypes={
    handleSetIsRemovePeopleDialogOpen:PropTypes.func,
    removalObject:PropTypes.object,
}
export default RemovePeopleDialog;