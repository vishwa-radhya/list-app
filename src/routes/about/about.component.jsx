import './about.styles.css';
import ReactSvg from '../../assets/react-svg.svg';
import ViteSvg from '../../assets/vite-svg.svg';
import FirebaseSvg from '../../assets/firebase-svg.svg';
import NetlifySvg from '../../assets/netlify-svg.svg';
import { useEffect, useRef } from 'react';
import ImgLoader from '../../components-3/img-loader/img-loader.component';
import { useState } from 'react';
import { FaSquareGithub } from 'react-icons/fa6';

const About=()=>{
    const [imgLoaded,setImgLoaded]=useState(false);
    const githubProfilePicRef = useRef(null);

    function handleChangeOfImg(){
        if(githubProfilePicRef.current){
            githubProfilePicRef.current.classList.remove('animate__animated', 'animate__rubberBand');
            // Force reflow
            void githubProfilePicRef.current.offsetWidth;
            githubProfilePicRef.current.classList.add('animate__animated', 'animate__rubberBand');
        }
    }
    
    useEffect(()=>{
        const img = new Image();
        img.src = "https://github.com/vishwa-radhya.png";
        img.onload=()=>setImgLoaded(true);
    },[])


    return (
        <div className='about-div animate__animated animate__fadeIn'>
            <p className='description'>Our Shopping List App, a simple and efficient tool designed to help you organize and manage your shopping needs.</p>
            <h5>Developed By</h5>
            <div className='dev-info'>
            {!imgLoaded && <ImgLoader/>}
                <img src="https://github.com/vishwa-radhya.png" ref={githubProfilePicRef} className='animate__animated animate__rubberBand' alt="dev-gh-img" width={180} onClick={handleChangeOfImg} style={{display:imgLoaded ? 'block' : 'none'}} />
                <a href="https://github.com/vishwa-radhya/list-app" target='_blank'>
                <p><FaSquareGithub className='fa-square-github' />
                <span>Vishwa Radhya</span></p>
                </a>
            </div>
            <h5>Powered By</h5>
            <div className='powered-by'>
                <div>
                    <a href="https://react.dev/" target='_blank'><img src={ReactSvg} alt="react" /></a>
                    <a href="https://vitejs.dev/" target='_blank'><img src={ViteSvg} alt="vite" /></a>
                </div>
                <div>
                    <a href="https://www.netlify.com/" target='_blank'><img src={NetlifySvg} alt="netlify" /></a>
                </div>
            </div>
            <h5>Utilities</h5>
            <div className='powered-by'>
                <div>
                    <a href="https://firebase.google.com/" target='_blank'><img src={FirebaseSvg} alt="firebase" /></a>
                </div>
            </div>
        </div>
    )
}
export default About;