import './about.styles.css';
import ReactSvg from '../../assets/react-svg.svg';
import ViteSvg from '../../assets/vite-svg.svg';
import FirebaseSvg from '../../assets/firebase-svg.svg';
import FontAwesomeSvg from '../../assets/font-awesome-svgr.svg';
import NetlifySvg from '../../assets/netlify-svg.svg';
import { useRef } from 'react';

const About=()=>{

    const githubProfilePicRef = useRef(null);

    function handleChangeOfImg(){
        if(githubProfilePicRef.current){
            githubProfilePicRef.current.classList.remove('animate__animated', 'animate__rubberBand');
            // Force reflow
            void githubProfilePicRef.current.offsetWidth;
            githubProfilePicRef.current.classList.add('animate__animated', 'animate__rubberBand');
        }
    }
    

    return (
        <div className='about-div'>
            <p className='description'>Our Shopping List App, a simple and efficient tool designed to help you organize and manage your shopping needs...</p>
            <h5>Developed By</h5>
            <div className='dev-info'>
                <img src="https://github.com/vishwa-radhya.png" ref={githubProfilePicRef} className='animate__animated animate__rubberBand' alt="dev-gh-img" width={180} onClick={handleChangeOfImg}  />
                <a href="https://github.com/vishwa-radhya/list-app" target='_blank'>
                <p><i className='fa-brands fa-square-github'></i><span>Vishwa Radhya</span></p>
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
                    <a href="https://fontawesome.com/" target='_blank'><img src={FontAwesomeSvg} alt="font-awesome" /></a>
                </div>
            </div>
        </div>
    )
}
export default About;