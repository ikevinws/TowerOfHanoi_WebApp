import React from 'react';

import './styles/styles.scss';
import Routes from './routes/routes';
import Navbar from './components/navbar/navbar';
import { BackgroundThemeProvider } from './utils/backgroundContext';
import { AuthProvider } from './utils/authContext';

const App = () => {
    return (
        <BackgroundThemeProvider>
            <AuthProvider>
                <Navbar />
                <Routes />
            </AuthProvider>
        </BackgroundThemeProvider>
    );
};

export default App;
