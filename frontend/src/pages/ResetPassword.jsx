import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/ResetPassword.module.css"; // Update the CSS file name
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../context/AppContext.jsx";

function ResetPassword() {
    const navigate = useNavigate();

    const { backendUrl } = useContext(AppContext);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
    const [loading, setLoading] = useState(false);

    // Error state for password mismatch
    const [passwordError, setPasswordError] = useState("");

    const handleSendResetCode = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {
                email,
            });
            if (data.success) {
                toast.success("Reset code sent to your email!", { autoClose: 3000 });
                setStep(2);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, {
                email,
                otp: verificationCode,
            });
            if (data.success) {
                toast.success("Code verified successfully!");
                setStep(3);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Invalid code");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match."); // Set error message
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
                email,
                otp: verificationCode,
                newPassword,
            });
            if (data.success) {
                toast.success("Password reset successfully!");
                navigate("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.resetPasswordContainer}>
            <h1 className={styles.title}>Reset Your Password</h1>

            {step === 1 && (
                <>
                    <p className={styles.description}>
                        Enter the email address associated with your account:
                    </p>
                    <input
                        className={styles.emailInput}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className={styles.resetButton}
                        onClick={handleSendResetCode}
                        disabled={!email}
                    >
                        {loading ? (
                            <div className={styles.loadingCircleContainer}>
                                <CircularProgress size={"20px"} color={"white"} />
                            </div>
                        ) : "Send Reset Code"}
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <p className={styles.description}>
                        A reset code has been sent to your email. Please enter the 6-digit code below:
                    </p>
                    <input
                        className={styles.codeInput}
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={6}
                        required
                    />
                    <button
                        className={styles.resetButton}
                        onClick={handleVerifyCode}
                        disabled={verificationCode.length !== 6}
                    >
                        {loading ? (
                            <div className={styles.loadingCircleContainer}>
                                <CircularProgress size={"20px"} color={"white"} />
                            </div>
                        ) : "Verify Code"}
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <p className={styles.description}>
                        Enter your new password:
                    </p>
                    <input
                        className={styles.passwordInput}
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordError("");
                        }}
                        required
                    />
                    <input
                        className={styles.passwordInput}
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError("");
                        }}
                        required
                    />
                    {passwordError && (
                        <p className={styles.errorText}>{passwordError}</p>
                    )}
                    <button
                        className={styles.resetButton}
                        onClick={handleResetPassword}
                        disabled={!newPassword || !confirmPassword}
                    >
                        {loading ? (
                            <div className={styles.loadingCircleContainer}>
                                <CircularProgress size={"20px"} color={"white"} />
                            </div>
                        ) : "Reset Password"}
                    </button>
                </>
            )}
        </div>
    );
}

export default ResetPassword;