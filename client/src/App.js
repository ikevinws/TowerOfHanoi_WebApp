import React from 'react';

import './styles/styles.scss';
import Routes from './routes/routes';
import { BackgroundThemeProvider } from './utils/backgroundContext';
import { AuthProvider } from './utils/authContext';

const App = () => {
    return (
        <div>
            <BackgroundThemeProvider>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </BackgroundThemeProvider>
        </div>
    );
};

export default App;
