import './about.styles.css';
import ReactSvg from '../../assets/react-svg.svg';
import ViteSvg from '../../assets/vite-svg.svg';
import FirebaseSvg from '../../assets/firebase-svg.svg';

const About=()=>{
    return (
        <div className='about-div'>
            <p className='description'>Our Shopping List App, a simple and efficient tool designed to help you organize and manage your shopping needs. </p>
            <h5>Developed By</h5>
            <div className='dev-info'>
                <a href="https://github.com/vishwa-radhya" target='_blank'>
                <img src="https://github.com/vishwa-radhya.png" alt="dev-gh-img" width={180} />
                </a>
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
                    <a href="https://firebase.google.com/" target='_blank'><img src={FirebaseSvg} alt="firebase" /></a>
                </div>
            </div>
        </div>
    )
}
export default About;