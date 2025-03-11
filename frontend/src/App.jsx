import React from 'react';
import './App.css';
import CarReservationForm from './pages/CarReservationForm.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import {Route, Routes, Navigate} from 'react-router-dom';
import CarPage from "./pages/CarPage.jsx"; // Import Navigate

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/home" element={<Navigate to="/" replace/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/car/:id" element={<CarPage />}/>
                <Route path="/reservation" element={<CarReservationForm />}/>
            </Routes>
            {/* <Footer /> */}
        </>
    );
}

export default App;