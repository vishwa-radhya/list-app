import Avatar from "boring-avatars";
import PropTypes from 'prop-types';

const AvatarTile = ({name,variant,size,selectedAvatar})=>{
    return(
        <Avatar name={name} variant={variant} size={size} style={{border: selectedAvatar === name ? '2px solid green' : '2px solid white',borderRadius:'50%',padding:'1.2px'}} />
    )
}
AvatarTile.propTypes={
    name:PropTypes.string,
    variant:PropTypes.string,
    size:PropTypes.number,
    selectedAvatar:PropTypes.string,
}
export default AvatarTile;