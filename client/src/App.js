import React from 'react';
import './styles/styles.scss';
import Game from './components/game';
import Navbar from './components/navbar';

const App = () => (
    <div className="dark-background">
        <Navbar />
        <Game />
    </div>
);

export default App;
