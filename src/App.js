import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
