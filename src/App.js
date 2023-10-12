import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import WheelOfLife from './pages/WheelOfLife';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wheeloflife" element={<WheelOfLife />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
