import { useParams } from 'react-router-dom';
import './folder-info.styles.css';
import { auth } from '../../utils/firebase';
import { useContext } from 'react';
import { ListItemsContext } from '../../contexts/list-items-context';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { FaFolderClosed } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa6';
import { FaLayerGroup } from 'react-icons/fa6';
import { FaBolt } from 'react-icons/fa6';
import { FolderNamesContext } from '../../contexts/folder-names-context';

const FolderInfo=()=>{
    const {folderName} = useParams();
    const userName = auth.currentUser.displayName;
    const {markerValue,items}=useContext(ListItemsContext);
    const {invoiceFolderNames}=useContext(FolderNamesContext);
    const isInvoiceInstanceTypeSelected = invoiceFolderNames.some(o=>o?.key?.trim()===folderName.trim());
    
    return(
        <div className='folder-info-component animate__animated animate__fadeIn'>
            <div className='folder-img'>
                <FaRegFolderOpen className="fi-b"></FaRegFolderOpen>
            </div>
            <h5>{!isInvoiceInstanceTypeSelected ? "Folder" :"Invoice"} Info</h5>
                <div className='items'>
                    <div>
                        <FaFolderClosed className='fi-s'></FaFolderClosed>
                        <div className='inner-block'>
                            <p>{!isInvoiceInstanceTypeSelected ? "Folder" :"Invoice"} Name</p>
                            <span>{folderName}</span>
                        </div>
                    </div>
                    <div>
                        <FaUser className='fi-s'></FaUser>
                        <div className='inner-block'>
                            <p>Owned By</p>
                            <span>{userName}</span>
                        </div>
                    </div>
                
                    <div>
                        <FaClock className='fi-s'></FaClock>
                        <div className='inner-block'>
                            <p>Creation Time</p>
                            <span>{markerValue}</span>
                        </div>
                    </div>
                    <div>
                        <FaLayerGroup className='fi-s'></FaLayerGroup>
                        <div className='inner-block'>
                            <p>Items Count</p>
                            <span>{!isInvoiceInstanceTypeSelected ? items.length : items.length-1}</span>
                        </div>
                    </div>
                    <div>
                        <FaBolt className='fi-s'></FaBolt>
                        <div className='inner-block'>
                            <p>Folder Type</p>
                            <span>dynamic {!isInvoiceInstanceTypeSelected ? "Folder" :"Invoice"}</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default FolderInfo;