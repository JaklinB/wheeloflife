import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroScreen.css';

function IntroScreen() {
    const navigate = useNavigate();

    return (
        <div className="intro-container">
            <h1>Welcome to the Wheel of Life!</h1>
            <p>The Wheel of Life is a visualization tool for various life areas. It helps you assess satisfaction levels in each segment.</p>
            <p>Segments represent aspects like health, relationships, and career. By filling them, you get a holistic life view.</p>
            <p>On the next page, you'll set your segments based on current feelings and aspirations.</p>
            <button className="intro-continue-button" onClick={() => navigate('/segmentInput')}>Get Started</button>
        </div>
    );
}

export default IntroScreen;
