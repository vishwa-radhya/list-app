import Picture from "../../components-3/picture/picture.component";
import nFavCat from '../../assets/n-fav-cat.png';
import './favorites.styles.css';
import InputAndBtn from "../../components-3/input-and-btn/Input-and-btn.component";
import ShoppingList from '../../components-1/shopping-list/shopping-list.component';
import { useEffect, useRef } from "react";
const Favorites=()=>{
    // console.log('render favorites component');
    const favoriteDivRef = useRef(null);

    useEffect(()=>{
        if(favoriteDivRef.current){
            favoriteDivRef.current.classList.remove('animate__animated', 'animate__fadeIn')
            void favoriteDivRef.current.offsetWidth;
            favoriteDivRef.current.classList.add('animate__animated', 'animate__fadeIn')
        }
    },[])

    return(
        <div className="fav-div-container animate__animated animate__fadeIn" ref={favoriteDivRef}>
            <Picture catImage={nFavCat} pictureWidth={150} />
            <InputAndBtn placeHolder='Enter Selected' buttonText='Add To Selected' pushAsFav={true} dbReference='home' />
            <ShoppingList isFavItemsOnly={true} dbReference='home' isFavOptionRequired={true} />
        </div>
    )
}
export default Favorites;