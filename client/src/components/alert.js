import React from 'react';
import { Alert } from 'react-bootstrap';

const errorList = (errArr) => {
    const errMsgsComponent = errArr.map((err, index) => <li key={index}>{err.msg}</li>);
    return <ul className="m-0 pl-4">{errMsgsComponent}</ul>;
};

const alert = ({ heading, showAlert, setShowAlert, message }) => {
    return showAlert ? (
        <Alert
            variant="warning"
            className="pr-5 m-0"
            dismissible
            onClose={() => setShowAlert(false)}
        >
            {heading ? <Alert.Heading>{heading}</Alert.Heading> : null}
            <div className="m-0">{message}</div>
        </Alert>
    ) : null;
};

export { alert, errorList };
