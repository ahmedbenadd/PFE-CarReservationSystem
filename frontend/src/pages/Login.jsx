import React, { useState } from "react";
import styles from '../styles/Login.module.css';
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!email || !password) {
            setError("* Please fill in all fields.");
            return;
        }

        const requestBody = {
            email,
            password,
        };

        console.log(requestBody);
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Login</h1>
            {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
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
                        Don't have an account? <Link to="/Signup" className={styles.link}>Signup</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Login;