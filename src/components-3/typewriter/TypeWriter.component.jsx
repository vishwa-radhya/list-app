import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

const TypeWriter=({text,speed=40})=>{
    const [displayedText,setDisplayedText]=useState('');
    useEffect(()=>{
        let currentIndex=0;
        const interval =setInterval(()=>{
            setDisplayedText((prev)=>prev+text[currentIndex]);
            currentIndex++;
            if(currentIndex===text.length-1){
                clearInterval(interval);
            }
        },speed);
        setDisplayedText('');
        return ()=>clearInterval(interval);
    },[text,speed]);
    return(
        <p>{displayedText}</p>
    )
}
TypeWriter.propTypes={
    text:PropTypes.string,
    speed:PropTypes.number,
}
export default TypeWriter;
