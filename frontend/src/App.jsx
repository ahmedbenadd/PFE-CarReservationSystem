import React from 'react';
import './App.css';
import CarReservationForm from './pages/CarReservationForm.jsx';
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/reservation" element={<CarReservationForm/>} />
            </Routes>
            {/*<Footer />*/}
        </>
    );

}

export default App;