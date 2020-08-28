import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import './styles/styles.scss';
import Navbar from './components/navbar';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import { BackgroundThemeProvider } from './utils/backgroundContext';

const App = () => {
    return (
        <Router>
            <BackgroundThemeProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Signin" component={SignIn} />
                    <Route exact path="/Signup" component={SignUp} />
                    <Redirect to="/" />
                </Switch>
            </BackgroundThemeProvider>
        </Router>
    );
};

export default App;
