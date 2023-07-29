import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";

const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    function addFavorite() {
        setFavorites(oldFavorites => [...oldFavorites, props]);
    }

    function removeFavorite() {
        setFavorites(oldFavorites => oldFavorites.filter(song => {
            console.log(song.id);
            console.log(props.id)
            if (song.id === props.id) {
                return false;
            } else {
                return true;
            }
        }))
    }

    console.log(favorites)

    return <Card>
        <img src = {props.img} alt = {props.title}/>
        <h4>{props.title}</h4>
        <h5>by {props.artist}</h5>
        <p>{props.genre} | {props.year} | {props.length}</p>
        {favorites.filter(song => {
            if (song.id === props.id) {
                return true;
            } else {
                return false;
            }
        }).length > 0 ? <Button variant="danger" onClick = {removeFavorite}>Remove from Favorites</Button> : <Button variant="primary" onClick = {addFavorite}>Add to Favorites</Button>}
        
    </Card>
}

export default Song;