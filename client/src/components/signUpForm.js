import React from 'react';
import { Form, Image, Button } from 'react-bootstrap';

const SignUpForm = () => {
    return (
        <Form className="signup-form">
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
                <Form.Control type="text" placeholder="Username" className="rounded-top" />
            </Form.Group>
            <Form.Group controlId="Password" className="mb-0">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className="rounded-0" />
            </Form.Group>
            <Form.Group controlId="ConfirmedPassword">
                <Form.Label srOnly>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-bottom"
                />
            </Form.Group>
            <Button varitant="primary" type="submit" block size="lg">
                Create Account
            </Button>
        </Form>
    );
};

export default SignUpForm;
