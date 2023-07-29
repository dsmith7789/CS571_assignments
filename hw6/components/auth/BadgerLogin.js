import { useState, useContext, React } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

export default function BadgerLogin() {

    // TODO Create the login component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);

    const navigate = useNavigate();

    const login = () => {
        fetch("https://www.cs571.org/s23/hw6/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect password!");
            } else if (res.status === 404) {
                alert("Incorrect username!");
            } else if (res.status === 200) {
                alert("Successfully logged in!");
                setLoggedIn(username);
                navigate("/")
            }
            return res.json();
        }).then(json => {
            console.log("Received back...");
            console.log(json);
        }).catch(e => {
            alert("An error occurred while making the request.")
        })
    }
    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                id="username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
            
            />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
                id="password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            
            />
            <br/>
            <Button
                variant="primary"
                onClick = {() => {
                    if (username === "" || password === "") {
                        alert("You must provide both a username and password!");
                    } else {
                        login();
                    }
                }}
            >Login</Button>
        </Form>
    </>
}