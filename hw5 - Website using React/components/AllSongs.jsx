import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";

const AllSongs = (props) => {

    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    // on load, do this
    useEffect(() => {
        fetch("https://cs571.org/s23/hw5/api/songs", {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(songData => {
            console.log(songData);
            setSongs(songData);
        })
    }, [])

    // after loading in the songs, do this
    useEffect(() => {
        // store distinct genres
        setGenres(Array.from(songs.reduce((genreSet, current) => genreSet.add(current.genre), new Set())));

        // then count the seconds
        setSeconds(songs.reduce((totalTime, current) => {
            const minutes = parseInt(current.length.split(":")[0]);
            const seconds = parseInt(current.length.split(":")[1]);
            return totalTime + (minutes * 60) + seconds;
        }, 0))
    }, [songs])

    return (
    <>
        <h1>Songs</h1>
        <h3>We have {songs.length} songs in {genres.length} genres for a total of {seconds} seconds of music!</h3>
        <Container>
            <Row xs = {1} sm = {2} md = {3} lg = {4} xl = {6}>
                {
                    songs.map(song => <Song key = {song.id} {...song}/>)
                }
            </Row>
        </Container>
        <BadgerBeatsFavoritesContext.Provider value = {[favorites, setFavorites]}></BadgerBeatsFavoritesContext.Provider>
    </>)
}

export default AllSongs;