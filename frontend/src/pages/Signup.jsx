import React, {useContext, useEffect, useState} from "react";
import styles from "../styles/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

function Signup() {
    const { backendUrl, setIsLoggedIn, getUserData, userData } = useContext(AppContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        confirmPassword: "",
        acceptTerms: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToTop();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        });

        let hasError = false;

        if (!name) {
            setErrors((prev) => ({ ...prev, name: "* Name is required." }));
            hasError = true;
        }

        if (!email) {
            setErrors((prev) => ({ ...prev, email: "* Email is required." }));
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors((prev) => ({ ...prev, email: "* Invalid email format." }));
            hasError = true;
        }

        if (!tel) {
            setErrors((prev) => ({ ...prev, tel: "* Phone number is required." }));
            hasError = true;
        } else if (!/^\d+$/.test(tel)) {
            setErrors((prev) => ({ ...prev, tel: "* Invalid phone number format. Only digits are allowed." }));
            hasError = true;
        } else if (tel.length !== 10) {
            setErrors((prev) => ({ ...prev, tel: "* Phone number must be exactly 10 digits." }));
            hasError = true;
        }

        if (!password) {
            setErrors((prev) => ({ ...prev, password: "* Password is required." }));
            hasError = true;
        } else if (password.length < 6) {
            setErrors((prev) => ({ ...prev, password: "* Password must be at least 6 characters long." }));
            hasError = true;
        } else if (!/[a-zA-Z]/.test(password)) {
            setErrors((prev) => ({ ...prev, password: "* Password must contain at least one letter." }));
            hasError = true;
        } else if (!/[0-9]/.test(password)) {
            setErrors((prev) => ({ ...prev, password: "* Password must contain at least one number." }));
            hasError = true;
        }

        if (!confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "* Confirm password is required." }));
            hasError = true;
        } else if (password !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "* Passwords do not match." }));
            hasError = true;
        }

        if (!acceptTerms) {
            setErrors((prev) => ({ ...prev, acceptTerms: true }));
            hasError = true;
        }

        if (hasError) return;

        const requestBody = {
            name,
            email,
            password,
            tel
        };

        try {
            setLoading(true);
            const {data} = await axios.post(backendUrl + "/api/auth/signup", requestBody);
            console.log(data);
            if (data.success) {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setAcceptTerms(false);
                setIsLoggedIn(true);
                getUserData();
                navigate("/");
                toast.success("Signup successful!");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "An error occurred during signup.");
            setPassword("");
            setConfirmPassword("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingCircle}>
                        <CircularProgress />
                    </div>
                </div>
            )}

            <h1 className={styles.title}>Sign Up</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        type="tel"
                        placeholder="Enter your phone number"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                    {errors.tel && <p className={styles.error}>{errors.tel}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                </div>

                <div className={styles.policyGroup}>
                    <div className={styles.policy} onClick={() => setAcceptTerms(!acceptTerms)}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <h3 className={`${styles.h3} ${errors.acceptTerms ? styles.policyErrorText : ""}`}>I accept all terms & conditions</h3>
                    </div>
                </div>

                <button className={styles.button} type="submit">
                    Sign Up
                </button>
                <div className={styles.loginPrompt}>
                    <h4 className={styles.h4}>
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className={styles.link}
                        >
                            Login
                        </Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Signup;