import Picture from "../../picture/picture.component";
import nFavCat from '../../assets/n-fav-cat.png';
import './favorites.styles.css';
import InputAndBtn from "../../input-and-btn/Input-and-btn.component";
import ShoppingList from '../../shopping-list/shopping-list.component';
const Favorites=()=>{
    // console.log('render favorites component');
    return(
        <div className="fav-div-container">
            <Picture catImage={nFavCat} pictureWidth={150} />
            <InputAndBtn placeHolder='Enter Favourites' buttonText='Add To Favourites' pushAsFav={true} dbReference='home' />
            <ShoppingList isFavItemsOnly={true} dbReference='home' isFavOptionRequired={true} />
        </div>
    )
}
export default Favorites;