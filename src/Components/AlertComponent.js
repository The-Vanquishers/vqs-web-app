import { AlertTitle, Alert } from '@mui/material';
import React from 'react';
function AlertComponent({ type, title, text }) {
    return (
        <div className='spinner-container'>
            <Alert severity={type}>
                <AlertTitle>{title}</AlertTitle>
                <strong>{text}</strong>
            </Alert>
        </div>
    );
}

export default AlertComponent;
