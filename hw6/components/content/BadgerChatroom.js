import React, { useContext, useEffect, useState } from "react"
import { Button, Form } from 'react-bootstrap';
import BadgerMessage from "./BadgerMessage"

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    const deletePost = (postId) => {
        fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${postId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted post!");  
            } 
            loadMessages();
        })
    }

    const makePost = () => {
        fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully posted!");
                loadMessages();
            }
            return res.json();
        }).then(json => {
            console.log("Received back...");
            console.log(json);
        }).catch(e => {
            alert("An error occurred while making the request.")
        })
    }

    return (<>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loggedIn ? 
            <Form>
                <Form.Label htmlFor="title">Post Title</Form.Label>
                <Form.Control
                    id="title"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                
                />
                <Form.Label htmlFor="content">Post Content</Form.Label>
                <Form.Control
                    id="content"
                    value = {content}
                    onChange = {(e) => setContent(e.target.value)}
                
                />
                <br/>
                <Button
                    variant="primary"
                    onClick = {() => {
                        if (title === "" || content === "") {
                            alert("You must provide both a title and content!");
                        } else {
                            makePost();
                        }
                    }}
                >Create Post</Button>
            </Form>
            : 
            <p>You must be logged in to post!</p>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map(message => 
                            <BadgerMessage key={message.id} {...message} delete={deletePost}/>
                          )
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>)
}