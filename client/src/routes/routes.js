import React, { useEffect, useRef } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Leaderboard from '../pages/leaderboard';
import { useAuthContext, useUserContext } from '../utils/authContext';

const PageRoutes = () => {
    /**
     * Must use useRef or else useEffect will complain about dependencies
     * if contextes were included in useEffect's dependencies, it will cause an infinite loop
     */
    const authRef = useRef(useAuthContext());
    const userRef = useRef(useUserContext());
    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get('/api/user/checkAuth', { withCredentials: true });
            if (res.data.userId) {
                authRef.current.setIsAuth(true);
                userRef.current.setUser((prevUserData) => {
                    return { ...prevUserData, userId: res.data.userId };
                });
            }
        };
        try {
            checkAuth();
        } catch (err) {
            authRef.current.setIsAuth(false);
        }
    }, []);

    //Route Summary: If user is signed in, block signin and sign up routes. Otherwise all routes are availble
    return (
        <Router>
            <Switch>
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/" component={Home} />
                <NotAuthRoute exact path="/signin" component={SignIn} />
                <NotAuthRoute exact path="/signup" component={SignUp} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

//reference: https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122
const NotAuthRoute = ({ component: Component, ...rest }) => {
    const auth = useAuthContext();
    return (
        <Route
            {...rest}
            render={(props) => (!auth.isAuth ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

export default PageRoutes;
