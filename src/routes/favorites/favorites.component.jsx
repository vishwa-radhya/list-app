import Picture from "../../picture/picture.component";
import favCat from '../../assets/fav-cat.jpg';
import './favorites.styles.css';
import InputAndBtn from "../../input-and-btn/Input-and-btn.component";
import ShoppingList from '../../shopping-list/shopping-list.component';
const Favorites=()=>{
    return(
        <div className="fav-div-container">
            <Picture catImage={favCat} pictureWidth={150} />
            <InputAndBtn placeHolder='Enter Favourites' buttonText='Add To Favourites' pushAsFav={true}  />
            <ShoppingList isFavItemsOnly={true} />
        </div>
    )
}
export default Favorites;