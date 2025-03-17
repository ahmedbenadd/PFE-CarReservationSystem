import React, { useState } from "react";
import styles from "../styles/Signup.module.css";
import { Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!acceptTerms) {
            setError("You must accept the terms and conditions.");
            return;
        }

        const requestBody = {
            name,
            email,
            password,
        };

        console.log(requestBody);
        setError("");
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className={styles.signupContainer}>
            <h1 className={styles.title}>Sign Up</h1>
            {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className={styles.policy}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <h3 className={styles.h3}>
                        I accept all terms & conditions
                    </h3>
                </div>
                <button className={styles.button} type="submit">
                    Sign Up
                </button>
                <div className={styles.loginPrompt}>
                    <h4 className={styles.h4}>
                        Already have an account? <Link to="/Login" className={styles.link}>Login</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Signup;