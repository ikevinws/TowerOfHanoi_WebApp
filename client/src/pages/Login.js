import React from 'react';
import LoginForm from '../components/LoginForm';
import { useBackground } from '../utils/BackgroundContext';

const Login = () => {
    const darkMode = useBackground();
    const theme = darkMode ? 'dark-background' : 'light-background';
    return (
        <div className={`${theme} d-flex align-items-center justify-content-center`}>
            <LoginForm />
        </div>
    );
};

export default Login;
