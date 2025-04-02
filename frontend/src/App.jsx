import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import CarPage from './pages/CarPage.jsx';
import Cars from './pages/Cars.jsx';
import Contact from './pages/Contact.jsx';
import Testimonials from './pages/Testimonials.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyAccount from './pages/MyAccount.jsx';
import MyReservations from './pages/MyReservations.jsx';
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={3000} />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/cars" element={<Cars />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/car/:id" element={<CarPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/myreservations" element={<MyReservations />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;