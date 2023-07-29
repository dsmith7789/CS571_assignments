import { useContext, useState, React } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);

    // TODO Create the register component.

    const navigate = useNavigate();

    const registerUser = () => {
        fetch("https://www.cs571.org/s23/hw6/api/register", {
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
            if (res.status === 200) {
                alert("Successfully registered user!");
                setLoggedIn(username);
                navigate("/");
            } else if (res.status === 400) {
                alert("You must provide both a username and password!")
            } else if (res.status === 409) {
                alert("That username has already been taken!")
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
        <h1>Register</h1>
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
            <Form.Label htmlFor="repeatPassword">Repeat Password</Form.Label>
            <Form.Control
                id="repeatPassword"
                value = {repeatPassword}
                onChange = {(e) => setRepeatPassword(e.target.value)}
            
            />
            <br/>
            <Button
                variant="primary"
                onClick = {() => {
                    if (repeatPassword !== password) {
                        alert("Your passwords do not match!");
                    } else {
                        registerUser();
                    }
                }}
            >Register</Button>
        </Form>
    </>
}