import React from 'react';
import SignInForm from '../components/signInForm';
import { useBackgroundTheme } from '../utils/backgroundContext';

const Login = () => {
    const backgroundTheme = useBackgroundTheme();
    return (
        <div className={`${backgroundTheme} d-flex align-items-center justify-content-center`}>
            <SignInForm />
        </div>
    );
};

export default Login;
