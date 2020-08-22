import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import './styles/styles.scss';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Singup';
import { BackgroundThemeProvider } from './utils/BackgroundContext';

const App = () => {
    return (
        <Router>
            <BackgroundThemeProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Signup" component={SignUp} />
                    <Redirect to="/" />
                </Switch>
            </BackgroundThemeProvider>
        </Router>
    );
};

export default App;
