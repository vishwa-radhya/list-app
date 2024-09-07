import { useParams } from 'react-router-dom';
import './folder-info.styles.css';
import { auth } from '../../utils/firebase';
import { useContext } from 'react';
import { ListItemsContext } from '../../contexts/list-items-context';

const FolderInfo=()=>{
    const {folderName} = useParams();
    const userName = auth.currentUser.displayName;
    const {markerValue,items}=useContext(ListItemsContext);

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
                            <span>{markerValue}</span>
                        </div>
                    </div>
                    <div>
                        <i className='fa-solid fa-layer-group'></i>
                        <div className='inner-block'>
                            <p>Items Count</p>
                            <span>{items.length}</span>
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