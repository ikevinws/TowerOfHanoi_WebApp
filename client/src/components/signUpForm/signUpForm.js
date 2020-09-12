import React, { useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { alert as FormAlert, errorList } from '../alert/alert';
import './signUpForm.scss';

const SignUpForm = () => {
    // form data handling
    const [signUpData, setSignUpData] = useState({
        username: '',
        password: '',
        confirmedPassword: ''
    });
    // error handling
    const [showSignInError, setShowSignInError] = useState(false);
    const [errorArr, setErrorArr] = useState([]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                '/api/user/signup',
                {
                    username: signUpData.username,
                    password: signUpData.password,
                    confirmedPassword: signUpData.confirmedPassword
                },
                { withCredentials: true }
            );
            if (res.status === 201) {
                window.location.href = '/signin';
            }
        } catch (err) {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.data.errors) {
                    setErrorArr([...err.response.data.errors]);
                }
            } else {
                // anything else
                setErrorArr((prevMsgs) => [
                    ...prevMsgs,
                    { msg: 'An error occurred on the server. Please try again' }
                ]);
            }
            setShowSignInError(true);
        }
    };

    return (
        <Form className="signup-form" onSubmit={handleSubmit}>
            <FormAlert
                showAlert={showSignInError}
                setShowAlert={setShowSignInError}
                message={errorList(errorArr)}
                heading={'Invalid Sign Up'}
            />
            <Image
                src="/images/CreateAccount_Icon.svg"
                alt="Create Account Icon"
                width="150"
                height="150"
                rounded
                className="d-block mx-auto"
            />
            <h3 className="h3 my-3 font-weight-normal ">Signup</h3>
            <Form.Group controlId="Username" className="mb-0">
                <Form.Label srOnly>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    className="rounded-top"
                    name="username"
                    value={signUpData.username}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="Password" className="mb-0">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password (6 characters)"
                    className="rounded-0"
                    name="password"
                    value={signUpData.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="ConfirmedPassword">
                <Form.Label srOnly>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-bottom"
                    name="confirmedPassword"
                    value={signUpData.confirmedPassword}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button varitant="primary" type="submit" block size="lg">
                Create Account
            </Button>
        </Form>
    );
};

export default SignUpForm;
