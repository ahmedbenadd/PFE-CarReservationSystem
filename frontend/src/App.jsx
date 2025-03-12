import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import CarPage from "./pages/CarPage.jsx";
import Cars from "./pages/Cars.jsx";
import Contact from './pages/Contact.jsx';
import Testimonials from "./pages/Testimonials.jsx";
import About from "./pages/About.jsx";
import Footer from './components/Footer.jsx';

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Navigate to="/" replace/>}/>
                <Route path="/cars" element={<Cars />}/>
                <Route path="/testimonials" element={<Testimonials />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/car/:id" element={<CarPage />}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App;