import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link, useNavigate } from "react-router-dom"; // Fixed import issue
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/VerifyEmail.module.css";
import CircularProgress from "@mui/material/CircularProgress";

function VerifyEmail() {
    const { userData, backendUrl, getUserData, isLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [isCodeFormVisible, setIsCodeFormVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        !userData && navigate("/");
        if (isLoggedIn && userData && userData.isVerified) {
            navigate("/");
        }
    }, [isLoggedIn, userData]);

    const handleSendVerificationCode = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

            if (data.success) {
                toast.success("Verification code sent to your email!", { autoClose: 3000 });
                setIsCodeFormVisible(true);
            } else {
                toast.error(data.message || "Failed to send verification code.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/auth/verify-email`, {
                otp: verificationCode,
            });

            if (data.success) {
                toast.success("Email verified successfully!");
                await getUserData(); // Refresh user data after verification
                navigate("/");
            } else {
                toast.error(data.message || "Invalid verification code.");
                setVerificationCode(""); // Clear the input field
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setVerificationCode(""); // Clear the input field
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.verifyEmailContainer}>
            {userData ? (
                <>
                    <h1 className={styles.title}>Verify Your Email</h1>

                    {!isCodeFormVisible && (
                        <>
                            <p className={styles.description}>
                                We will send a verification code to your email address. Please confirm this is the
                                correct email:
                            </p>

                            <div className={styles.emailDisplay}>
                                <strong>{userData.email}</strong>
                            </div>

                            <button
                                className={styles.verifyButton}
                                onClick={handleSendVerificationCode}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className={styles.loadingCircleContainer}>
                                        <CircularProgress size={"20px"} color={"white"} />
                                    </div>
                                ) : (
                                    "Send Verification Code"
                                )}
                            </button>

                            <p className={styles.changeEmailPrompt}>
                                Is this email incorrect?{" "}
                                <Link to="/myaccount" className={styles.changeEmailLink}>
                                    Change your email
                                </Link>
                            </p>
                        </>
                    )}

                    {isCodeFormVisible && (
                        <>
                            <p className={styles.description}>
                                A verification code has been sent to your email. Please enter the 6-digit code below:
                            </p>

                            <input
                                className={styles.codeInput}
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
                                maxLength={6}
                            />

                            <button
                                className={styles.verifyButton}
                                onClick={handleVerifyCode}
                                disabled={verificationCode.length !== 6 || loading}
                            >
                                {loading ? (
                                    <div className={styles.loadingCircleContainer}>
                                        <CircularProgress size={"20px"} color={"white"} />
                                    </div>
                                ) : (
                                    "Verify Code"
                                )}
                            </button>
                        </>
                    )}
                </>
            ) : (
                <div className={styles.loading}>
                    <CircularProgress />
                </div>
            )
            }
        </div>
    );
}

export default VerifyEmail;