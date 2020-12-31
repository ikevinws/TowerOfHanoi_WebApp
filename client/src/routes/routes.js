import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
//context
import { useAuthContext, useUserContext } from '../utils/authContext';
import { useBackgroundTheme } from '../utils/backgroundContext';
//pages
import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Leaderboard from '../pages/leaderboard';
//components
import Navbar from '../components/navbar/navbar';

const PageRoutes = () => {
    const { isAuth, setIsAuth } = useAuthContext();
    const { setUser } = useUserContext();

    //resReceived is passed down to Home component to determine if sign in alert should be displayed
    const [resReceived, setResReceived] = useState(false);

    //check if user is auth
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/api/user/checkAuth', { withCredentials: true });
                if (res.data.userId) {
                    setIsAuth(true);
                    setUser((prevUserData) => {
                        return { ...prevUserData, userId: res.data.userId };
                    });
                }
                setResReceived(true);
            } catch (err) {
                setResReceived(true);
            }
        };
        checkAuth();
    }, [setIsAuth, setUser]);
    //background
    const backgroundTheme = useBackgroundTheme();

    //Route Summary: If user is signed in, block signin and sign up routes. Otherwise all routes are availble
    return (
        <div className={`${backgroundTheme} background-container`}>
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/leaderboard" component={Leaderboard} />
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} resReceived={resReceived} />}
                    />
                    <NotAuthRoute exact path="/signin" component={SignIn} isAuth={isAuth} />
                    <NotAuthRoute exact path="/signup" component={SignUp} isAuth={isAuth} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};

//reference: https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122
const NotAuthRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (!isAuth ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

export default PageRoutes;
