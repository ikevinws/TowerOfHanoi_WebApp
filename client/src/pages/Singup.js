import React from 'react';
import SingUpForm from '../components/SignupForm';
import { useBackground } from '../utils/BackgroundContext';

const SignUp = () => {
    const darkMode = useBackground();
    const theme = darkMode ? 'dark-background' : 'light-background';
    return (
        <div className={`${theme} d-flex align-items-center justify-content-center`}>
            <SingUpForm />
        </div>
    );
};

export default SignUp;
