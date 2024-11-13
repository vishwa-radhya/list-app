import './item-exchange-header.styles.css';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ItemExchangeHeader=()=>{

    const navigateRouter = useNavigate();

    return(
        <div className='ie-header-div'>
            <FaArrowLeft className='icon' onClick={()=>navigateRouter('/item-transfer')} />
        </div>
    )
}
export default ItemExchangeHeader;