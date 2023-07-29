import React, { useContext, useEffect } from 'react';

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

export default function BadgerLogout() {

    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoggedIn("");
            // Maybe you need to do something here?
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}