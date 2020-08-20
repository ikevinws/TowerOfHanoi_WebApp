import React, { useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';

const AppNavbar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const handleDarkModeSwitch = () => setDarkMode(!darkMode);

    return (
        <Navbar expand="false" sticky="top" bg="dark" variant="dark">
            <Nav.Item>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand className="ml-2">Tower Of Hanoi</Navbar.Brand>
            </Nav.Item>
            <Form.Check
                className="text-white-50 py-2 p-sm-2"
                type="switch"
                id="dark-mode-switch"
                label="Dark-Mode"
                checked={darkMode}
                onChange={handleDarkModeSwitch}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-2">
                    <Nav.Link href="/SignIn">Sign In</Nav.Link>
                    <Nav.Link href="/CreateAccount">Create Account</Nav.Link>
                    <Nav.Link href="/Logout">Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
