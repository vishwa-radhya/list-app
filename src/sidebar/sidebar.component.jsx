import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.styles.css';
const SideBar=()=>{
    const [isSideBarOpen,setIsSideBarOpen]=useState(false);
    const sideBarRef = useRef(null);
    const sideBarToggleRef = useRef(null);

    const sideBarStyles={
        width: isSideBarOpen ? '120px' : '0',
        padding : isSideBarOpen ? '8px 10px' : '0',
    }

    

    function sideBarToggleHandler(){
        setIsSideBarOpen(!isSideBarOpen);
    }

    function handleSideBarOutSideClick(event){
        if(sideBarRef.current && !sideBarRef.current.contains(event.target) && !sideBarToggleRef.current.contains(event.target)){
            setIsSideBarOpen(false);
        }
    }
    useEffect(()=>{

        if(isSideBarOpen){
            document.addEventListener('click',handleSideBarOutSideClick);
        }else{
            document.removeEventListener('click',handleSideBarOutSideClick);
        }
        return ()=>{
            document.removeEventListener('click',handleSideBarOutSideClick);
        }

    },[isSideBarOpen]);

    return(
        <div className="side-bar-container" >
            <div className="side-bar" style={sideBarStyles} ref={sideBarRef}>
               <Link to='/'> <div className='side-bar-items side-bar-home'><i className="fa-solid fa-house"></i>Home</div></Link>
               <Link to='/fav'> <div className='side-bar-items'><i className="fa-solid fa-star" style={{color:'gold'}}></i>Favorites</div></Link>
            </div>
            <div className='side-bar-toggle' ref={sideBarToggleRef}><i className={isSideBarOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} onClick={sideBarToggleHandler}></i></div>
        </div>
    )
}
export default SideBar;