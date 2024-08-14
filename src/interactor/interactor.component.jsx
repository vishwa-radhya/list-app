import { Fragment} from "react"
import ShoppingList from "../shopping-list/shopping-list.component";
import './interactor.styles.css';
import Picture from '../picture/picture.component';
import catImage from '../assets/cat.jpg'
import InputAndBtn from "../input-and-btn/Input-and-btn.component";
const Interactor=()=>{ 
    // console.log('render interactor');
    return(
        <Fragment>
            <Picture catImage={catImage} pictureWidth={200}/>
            <InputAndBtn placeHolder='Enter Items' buttonText='Add To Cart' pushAsFav={false} dbReference='home' />
            <ShoppingList isFavItemsOnly={false}  dbReference='home' isFavOptionRequired={true} />
        </Fragment>
    )
}
export default Interactor;
