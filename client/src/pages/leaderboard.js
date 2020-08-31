import React from 'react';
import { useBackgroundTheme } from '../utils/backgroundContext';

const Leaderboard = () => {
    const backgroundTheme = useBackgroundTheme();
    return <div className={`${backgroundTheme} `}></div>;
};

export default Leaderboard;
