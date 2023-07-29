import { useContext, React, useEffect } from "react"
import { Button } from "react-bootstrap";

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);

    const handleDelete = () => {
        props.delete(props.id)
    }

    return (
    <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            loggedIn === props.poster ?
            <Button
                variant="danger"
                onClick = {handleDelete}
            >Delete Post</Button>
            :
            <></>
        }
    </>)
}

export default BadgerMessage;