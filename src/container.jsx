import Interactor from "./interactor";
import catImage from './assets/cat.jpg';
const Container=()=>{
    return(
        <div className="container">
            <img src={catImage} width={200} alt="shopping-cat" />
            <Interactor/>
        </div>
    )
}
export default Container;