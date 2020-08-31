import React from 'react';
import SignInForm from '../components/signInForm';
import { useBackgroundTheme } from '../utils/backgroundContext';
const Login = () => {
    const backgroundTheme = useBackgroundTheme();
    return (
        <div className={`${backgroundTheme} signin-container`}>
            <SignInForm />
        </div>
    );
};

export default Login;
