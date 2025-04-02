import React, {useContext, useEffect, useState} from "react";
import styles from "../styles/Login.module.css";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {toast} from "react-toastify";

function Login() {
    const {backendUrl, setIsLoggedIn, getUserData, userData} = useContext(AppContext);
    const queryParams = new URLSearchParams(location.search);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToTop();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("* Please fill in all fields.");
            return;
        }

        const requestBody = {
            email,
            password,
        };

        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + "/api/auth/login", requestBody);
            console.log(data);
            if(data.success) {
                setEmail("");
                setPassword("");
                setIsLoggedIn(true);
                getUserData();
                setLoading(false);
                navigate("/");
                toast.success("Login successful!", {autoClose: 800});
            } else {
                setLoading(false);
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.data.message || "An error occurred during login.");
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingCircle}>
                        <CircularProgress />
                    </div>
                </div>
            )}

            <h1 className={styles.title}>Login</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.button} type="submit">
                    Login
                </button>
                <div className={styles.signupPrompt}>
                    <h4 className={styles.h4}>
                        Don't have an account?{" "}
                        <Link
                            to={"/signup"}
                            className={styles.link}
                        >
                            Signup
                        </Link>
                    </h4>
                    <h4 className={styles.h4}>
                        Forgot your password?{" "}
                        <Link
                            to={"/reset-password"} // Link to the reset password page
                            className={styles.link}
                        >
                            Reset Password
                        </Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Login;
