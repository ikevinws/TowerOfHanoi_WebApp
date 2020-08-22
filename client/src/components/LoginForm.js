import React from 'react';
import { Form, Image, Button } from 'react-bootstrap';

const LoginForm = () => {
    return (
        <Form className="login-form">
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
                <Form.Control type="text" placeholder="Username" className="rounded-top" />
            </Form.Group>
            <Form.Group controlId="Password">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className="rounded-bottom" />
            </Form.Group>
            <Button varitant="primary" type="submit" block size="lg">
                Sign In
            </Button>

            <p className="mt-2 text-muted">
                No account?
                <a href="/Signup" className="ml-1">
                    Signup
                </a>
            </p>
        </Form>
    );
};

export default LoginForm;
