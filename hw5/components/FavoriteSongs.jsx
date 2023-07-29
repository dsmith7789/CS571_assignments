import { useContext, useEffect, useState } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { Container, Row } from "react-bootstrap";
import Song from "./Song";

const FavoriteSongs = (props) => {

    const [genres, setGenres] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    // after loading in the songs, do this
    useEffect(() => {
        // store distinct genres
        setGenres(Array.from(favorites.reduce((genreSet, current) => genreSet.add(current.genre), new Set())));

        // then count the seconds
        setSeconds(favorites.reduce((totalTime, current) => {
            const minutes = parseInt(current.length.split(":")[0]);
            const seconds = parseInt(current.length.split(":")[1]);
            return totalTime + (minutes * 60) + seconds;
        }, 0))
    }, [favorites])

    return <div>
        <h1>Favorites</h1>
        <h3>You have favorited {favorites.length} songs in {genres.length} genres for a total of {seconds} seconds of music!</h3>
        <Container>
            <Row xs = {1} sm = {2} md = {3} lg = {4} xl = {6}>
                {
                    favorites.map(song => <Song key = {song.id} {...song}/>)
                }
            </Row>
        </Container>
    </div>
}

export default FavoriteSongs;