import React from 'react';
import Game from '../components/Game';
import { useBackground } from '../utils/BackgroundContext';

const Home = () => {
    const darkMode = useBackground();
    return (
        <div className={darkMode ? 'dark-background' : 'light-background'}>
            <Game />
        </div>
    );
};

export default Home;
