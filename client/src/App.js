import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import './styles/styles.scss';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

const App = () => (
    <Router>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Signup" component={SignUp} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

export default App;
