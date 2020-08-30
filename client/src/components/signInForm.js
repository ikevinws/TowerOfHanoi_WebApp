import React, { useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { formAlert as FormAlert, errorList } from './formAlert';
const SignInForm = () => {
    //error handling
    const [showSignInError, setShowSignInError] = useState(false);
    const [errorArr, setErrorArr] = useState(['Invalid username or password']);

    //form data handling
    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                '/api/user/signin',
                {
                    username: signInData.username,
                    password: signInData.password
                },
                { withCredentials: true }
            );
            if (res.status === 200) {
                window.location.href = '/';
            }
        } catch (err) {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.data.errors) {
                    setErrorArr([...err.response.data.errors]);
                }
            } else {
                // anything else
                setErrorArr(['An error occurred on the server. Please try again']);
            }
            setShowSignInError(true);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    };
    return (
        <Form className="signin-form" onSubmit={handleSubmit}>
            <FormAlert
                showAlert={showSignInError}
                setShowAlert={setShowSignInError}
                message={errorList(errorArr)}
            />
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
