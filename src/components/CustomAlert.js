import React from 'react';
import '../App.css';

function CustomAlert({ message, onClose }) {
    return (
        <div className="custom-alert">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default CustomAlert;
