import React, { useState } from 'react';
import { Form, Image, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
const SignInForm = () => {
    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });
    const [showError, setShowError] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/api/user/signin', {
                username: signInData.username,
                password: signInData.password
            });
            if (res.status === 200) {
            }
        } catch (err) {
            setShowError(true);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    };

    return (
        <Form className="signin-form" onSubmit={handleSubmit}>
            {showError ? (
                <Alert variant="warning" dismissible onClose={() => setShowError(false)}>
                    <p className="m-0">Incorrect username or password.</p>
                </Alert>
            ) : null}
            <Image
                src="/images/TowerOfHanoi_Icon.svg"
                alt="Tower of Hanoi Icon"
                width="150"
                height="150"
                rounded
                className="d-block mx-auto"
            />
            <h3 className="h3 mb-3 font-weight-normal ">Login</h3>
            <Form.Group controlId="Username" className="mb-0">
                <Form.Label srOnly>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    className="rounded-top"
                    name="username"
                    value={signInData.username}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="Password">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    className="rounded-bottom"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button varitant="primary" type="submit" block size="lg">
                Sign In
            </Button>

            <p className="mt-2 text-muted">
                No account?
                <a href="/signup" className="ml-1">
                    Signup
                </a>
            </p>
        </Form>
    );
};

export default SignInForm;
