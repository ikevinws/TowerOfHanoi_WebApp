import React from 'react';
import Game from '../components/game';
import { useBackgroundTheme } from '../utils/backgroundContext';

const Home = () => {
    const backgroundTheme = useBackgroundTheme();
    return (
        <div className={backgroundTheme}>
            <Game />
        </div>
    );
};

export default Home;
