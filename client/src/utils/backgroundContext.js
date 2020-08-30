import React, { useState, useContext, useEffect } from 'react';

const BackgroundContext = React.createContext();
const BackgroundUpdateContext = React.createContext();

const useBackgroundTheme = () => {
    return useContext(BackgroundContext) ? 'dark-background' : 'light-background';
};
const useBackground = () => {
    return useContext(BackgroundContext);
};
const useBackgroundUpdate = () => {
    return useContext(BackgroundUpdateContext);
};

const BackgroundThemeProvider = ({ children }) => {
    const getInitialMode = () => {
        const savedDarkMode = JSON.parse(localStorage.getItem('dark'));
        if (savedDarkMode == null) {
            //if no value default to true
            return true;
        }
        return savedDarkMode ? true : false;
    };

    const [darkMode, setDarkMode] = useState(getInitialMode());

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <BackgroundContext.Provider value={darkMode}>
            <BackgroundUpdateContext.Provider value={toggleDarkMode}>
                {children}
            </BackgroundUpdateContext.Provider>
        </BackgroundContext.Provider>
    );
};

export { BackgroundThemeProvider, useBackground, useBackgroundUpdate, useBackgroundTheme };
