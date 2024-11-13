import ItemExchangeHeader from '../../components-3/ie-header/item-exchange-header.component';
import ItemExchangeMap from '../../components-4/ie-map/item-exchange-map.component';
import './item-exchange-received.styles.css';
const ItemExchangeReceived=()=>{
    return(
        <div className='animate__animated animate__fadeIn ie-received-div'>
            <ItemExchangeHeader />
            <ItemExchangeMap fetchAt={'received'} role={'sender'} />
        </div>
    )
}
export default ItemExchangeReceived;