import './item-exchange-header.styles.css';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { TbRefresh } from "react-icons/tb";
import PropTypes from 'prop-types';

const ItemExchangeHeader=({handleFetchTrigger})=>{

    const navigateRouter = useNavigate();

    return(
        <div className='ie-header-div'>
            <FaArrowLeft className='icon back' onClick={()=>navigateRouter('/item-transfer')} />
            <TbRefresh className='icon refresh' onClick={handleFetchTrigger}  />
        </div>
    )
}
ItemExchangeHeader.propTypes={
    handleFetchTrigger:PropTypes.func,
}
export default ItemExchangeHeader;