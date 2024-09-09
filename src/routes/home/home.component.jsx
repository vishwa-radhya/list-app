import { useEffect, useRef } from "react";
import Interactor from "../../components-1/interactor/interactor.component"
import './home.styles.css';
const Home=()=>{
    // console.log('render home');
    const homeDivRef = useRef(null);

    useEffect(()=>{
        if(homeDivRef.current){
            homeDivRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void homeDivRef.current.offsetWidth;
            homeDivRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[])

    return(
        <div className="home-div animate__animated animate__fadeIn" ref={homeDivRef}>
            <Interactor/>
        </div>
    )
}
export default Home;