import './item-exchange-map.styles.css';
import DataLoader from '../../components-4/data-loader/data-loader.component';
import { useState,useEffect } from 'react';
import { firestoreDatabase } from '../../utils/firebase';
import { collection,query,orderBy,limit,startAfter,getDocs } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Avatar from 'boring-avatars';
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaRegListAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

const ItemExchangeMap=({fetchAt,role})=>{

    const [messages,setMessages]=useState([]);
    const [lastDoc,setLastDoc]=useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
        //init fetch 10
        const fetchInitialMessages=async()=>{
            setLoading(true)
            const messagesRef = collection(firestoreDatabase,'messages',user.uid,fetchAt);
            const q = query(messagesRef,orderBy('timeStamp','desc'),limit(10));
            const snapShot = await getDocs(q);
            const initialMessages = snapShot.docs.map(doc=>({id:doc.id,...doc.data(),timeStamp: doc.data().timeStamp.toDate().toLocaleString()}))
            setMessages(initialMessages);
            setLastDoc(snapShot.docs[snapShot.docs.length-1]);
            setLoading(false);
        }
        fetchInitialMessages();
    },[user.uid])
    
    return(
        <div className='ie-map-div'>
            {messages.map(obj=>{
                return <div key={obj.id} className='tile'>
                    <div className='head'>
                        <Avatar name={obj.avatarLetter} variant='beam' size={26} />
                        <div>
                        <span className='heading'>{fetchAt === 'sent' ? 'sent to' : 'sent by' }</span>
                        <span className='name'>{obj[role]}</span>
                        </div>
                    </div>
                    <p className='content'><FaRegListAlt/> {obj.content}</p>
                    <span className='time'> <FaClockRotateLeft/> {obj.timeStamp}</span>
                </div>
            })}
            {loading && <DataLoader/>}
        </div>
    )
}
ItemExchangeMap.propTypes={
    fetchAt:PropTypes.string,
    role:PropTypes.string,

}
export default ItemExchangeMap;