import React from 'react';
import SingUpForm from '../components/signUpForm';
import { useBackgroundTheme } from '../utils/backgroundContext';

const SignUp = () => {
    const backgroundTheme = useBackgroundTheme();
    return (
        <div className={`${backgroundTheme} d-flex align-items-center justify-content-center`}>
            <SingUpForm />
        </div>
    );
};

export default SignUp;
