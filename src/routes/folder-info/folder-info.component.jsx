import { useParams } from 'react-router-dom';
import './folder-info.styles.css';
import { auth } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import { ref,get} from 'firebase/database';
import { database } from '../../utils/firebase';

const FolderInfo=()=>{
    const {folderName} = useParams();
    const userName = auth.currentUser.displayName;
    const [folderCreationTime,setFolderCreationTime]=useState('Sun Sep 00 0000 00:00:00');
    const [numOfFolderItems,setNumOfFolderItems]=useState('0');
    const user = auth.currentUser;
    const userId = user.uid;

    useEffect(()=>{
        const folderRef = ref(database,`shoppingLists/${userId}/folders/${folderName}`)
        get(folderRef).then((snapshot)=>{
            const folderItems = snapshot.val();
            setFolderCreationTime(folderItems.marker);
            setNumOfFolderItems(Object.keys(folderItems).length-1);
            
        })
    },[folderName,userId])

    return(
        <div className='folder-info-component'>
            <div className='folder-img'>
                <i className="fa-regular fa-folder-open"></i>
            </div>
            <h5>Folder Info</h5>
                <div className='items'>
                    <div>
                        <i className='fa-solid fa-folder-closed'></i>
                        <div className='inner-block'>
                            <p>Folder Name</p>
                            <span>{folderName}</span>
                        </div>
                    </div>
                    <div>
                        <i className='fa-solid fa-user'></i>
                        <div className='inner-block'>
                            <p>Owned By</p>
                            <span>{userName}</span>
                        </div>
                    </div>
                
                    <div>
                        <i className='fa-solid fa-clock'></i>
                        <div className='inner-block'>
                            <p>Creation Time</p>
                            <span>{folderCreationTime}</span>
                        </div>
                    </div>
                    <div>
                        <i className='fa-solid fa-layer-group'></i>
                        <div className='inner-block'>
                            <p>Items Count</p>
                            <span>{numOfFolderItems}</span>
                        </div>
                    </div>
                    <div>
                        <i className='fa-solid fa-bolt'></i>
                        <div className='inner-block'>
                            <p>Folder Type</p>
                            <span>dynamic folders</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default FolderInfo;