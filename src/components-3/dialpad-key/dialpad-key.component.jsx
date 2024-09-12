import PropTypes from 'prop-types';
import './dialpad-key.styles.css';
const DialpadKey=({num,setInputValue})=>{
    return (
        <div className='dialpad-key' onClick={
            ()=>setInputValue(num)}
            ><span>{num}</span></div>
    )
}
DialpadKey.propTypes={
    num:PropTypes.string,
    setInputValue:PropTypes.func,
}
export default DialpadKey;