import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../styles/LoginPrompt.module.css";

const LoginPrompt = ({showPrompt, setShowPrompt, message, type}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = () => {
        setShowPrompt(false);
        navigate(`/login?redirect=${location.pathname}`);
    };

    const handleVerify = () => {
        setShowPrompt(false);
        navigate(`/verify-email?redirect=${location.pathname}`);
    }

    const handleCancel = () => {
        setShowPrompt(false);
    };

    return (
        <div
            className={`${styles.overlay} ${showPrompt ? styles.show : ""}`}
        >
            <div
                className={`${styles.dialog} ${showPrompt ? styles.show : ""}`}
            >
                <p className={styles.p}>{message}</p>
                {type === "login" ? (<button
                    className={`${styles.button} ${styles.login}`}
                    onClick={handleLogin}
                >
                    Login / Signup
                </button>) :
                    (<button
                        className={`${styles.button} ${styles.login}`}
                        onClick={handleVerify}
                    >
                        Verify Email
                    </button>
                    )
                }


                <button
                    className={`${styles.button} ${styles.cancel}`}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LoginPrompt;