import ItemExchangeHeader from '../../components-3/ie-header/item-exchange-header.component';
import ItemExchangeMap from '../../components-4/ie-map/item-exchange-map.component';
import './item-exchange-received.styles.css';
import { useState } from 'react';


const ItemExchangeReceived=()=>{
    const [fetchTrigger,setFetchTrigger]=useState(false);

    const handleFetchTrigger=()=>{
        setFetchTrigger(prev=>!prev);
    }

    return(
        <div className='animate__animated animate__fadeIn ie-received-div'>
            <ItemExchangeHeader handleFetchTrigger={handleFetchTrigger} />
            <ItemExchangeMap fetchAt={'received'} role={'sender'} fetchTrigger={fetchTrigger} />
        </div>
    )
}
export default ItemExchangeReceived;