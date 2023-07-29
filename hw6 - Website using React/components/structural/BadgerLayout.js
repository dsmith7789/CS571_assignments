import { useContext, useState, React, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'

import BadgerChatLoginContext from '../../contexts/BadgerChatLoginContext';

function BadgerLayout(props) {

    console.log(props)

    const [loggedIn, setLoggedIn] = useContext(BadgerChatLoginContext);
    const [navButtons, setNavButtons] = useState()

    useEffect(() => {
        if (loggedIn) {
            setNavButtons(<Nav.Link as={Link} to="logout">Logout</Nav.Link>)
        } else {
            setNavButtons(<><Nav.Link as={Link} to="login">Login</Nav.Link> <Nav.Link as={Link} to="register">Register</Nav.Link> </>)
        }
    }, [loggedIn])

    console.log(loggedIn)

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {navButtons}
                        <NavDropdown title="Chatrooms">
                            {
                               /* Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                               props.chatrooms.map(room => <NavDropdown.Item as={Link} to={"chatrooms/" + room} key={room}>{room}</NavDropdown.Item>)
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;