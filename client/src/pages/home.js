import React from 'react';
import Game from '../components/game';
import { useBackground } from '../utils/backgroundContext';

const Home = () => {
    const darkMode = useBackground();
    return (
        <div className={darkMode ? 'dark-background' : 'light-background'}>
            <Game />
        </div>
    );
};

export default Home;
