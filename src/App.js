import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import WheelOfLife from './pages/WheelOfLife';
import AboutPage from './pages/AboutPage';
import ImprovementsPage from './pages/ImprovementsPage';
import Navbar from './components/NavBar';
import SegmentInput from './pages/SegmentInput';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/segmentInput" element={<SegmentInput />} />
                    <Route path="/segmentInput/about" element={<AboutPage />} />
                    <Route path="/wheeloflife/*" element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route index element={<WheelOfLife />} />
                                <Route path="about" element={<AboutPage />} />
                                <Route path="improvements" element={<ImprovementsPage />} />
                            </Routes>
                        </>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
