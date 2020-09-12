import React, { useEffect, useState } from 'react';
import Game from '../components/game/game';
import { useAuthContext } from '../utils/authContext';
import { alert as Alert } from '../components/alert/alert';
import { Container } from 'react-bootstrap';
const Home = ({ resReceived }) => {
    const auth = useAuthContext();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // if server has already already responded and user is unauthorized
        if (resReceived && !auth.isAuth) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [auth.isAuth, resReceived]);

    return (
        <div className="w-100 home-container">
            {showAlert ? (
                <Container className="d-block my-3 p-0">
                    <Alert
                        message={'Sign in to have your scores recorded on the leaderboard.'}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    />
                </Container>
            ) : null}
            <Game />
        </div>
    );
};

export default Home;
