import React from 'react';
import SingUpForm from '../components/signUpForm';
import { useBackground } from '../utils/backgroundContext';

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
