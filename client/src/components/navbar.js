import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useBackground, useBackgroundUpdate } from '../utils/backgroundContext';
import axios from 'axios';

const AppNavbar = () => {
    const darkMode = useBackground();
    const toggleDarkMode = useBackgroundUpdate();
    const handleSignOut = async () => {
        try {
            const res = await axios.get('/api/user/signout');
            if (res.status === 200) {
                //redirect
            }
        } catch {
            alert('An error has occured. Please try again.');
        }
    };
    return (
        <Navbar expand="false" bg="dark" variant="dark">
            <Nav.Item>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand className="ml-2" href="/">
                    Tower Of Hanoi
                </Navbar.Brand>
            </Nav.Item>
            <Form.Check
                className="text-white-50 py-2 p-sm-2"
                type="switch"
                id="dark-mode-switch"
                label="Dark-Mode"
                checked={darkMode}
                onChange={toggleDarkMode}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-2">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                    <Nav.Link href="/signup">Create Account</Nav.Link>
                    <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
