import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className="nav-container">
            <nav>
                <Link to="/wheeloflife">Wheel of Life</Link>
                <Link to="/wheeloflife/about">About</Link>
                <Link to="/wheeloflife/improvements">Improvements</Link>
                <Link to="/">Logout</Link>
            </nav>
            <div className="burger-menu" onClick={() => setMenuActive(!menuActive)}>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
            </div>
            <div className={`responsive-menu ${menuActive ? 'active' : ''}`}>
                <Link to="/wheeloflife" onClick={() => setMenuActive(false)}>Wheel of Life</Link>
                <Link to="/wheeloflife/about" onClick={() => setMenuActive(false)}>About</Link>
                <Link to="/wheeloflife/improvements" onClick={() => setMenuActive(false)}>Improvements</Link>
                <Link to="/" onClick={() => setMenuActive(false)}>Logout</Link>
            </div>
        </div>
    );
}

export default Navbar;
