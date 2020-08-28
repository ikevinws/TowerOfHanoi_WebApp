import React from 'react';
import SignInForm from '../components/signInForm';
import { useBackground } from '../utils/backgroundContext';

const Login = () => {
    const darkMode = useBackground();
    const theme = darkMode ? 'dark-background' : 'light-background';
    return (
        <div className={`${theme} d-flex align-items-center justify-content-center`}>
            <SignInForm />
        </div>
    );
};

export default Login;
