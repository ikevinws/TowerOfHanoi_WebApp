import React from 'react';
import { Alert } from 'react-bootstrap';

const formAlert = ({ heading, showAlert, setShowAlert, message }) => {
    return showAlert ? (
        <Alert variant="warning" className="pr-5" dismissible onClose={() => setShowAlert(false)}>
            {heading ? <Alert.Heading>{heading}</Alert.Heading> : null}
            <p className="m-0">{message}</p>
        </Alert>
    ) : null;
};

export default formAlert;
