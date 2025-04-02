import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import styles from "../styles/MyAccount.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";

function MyAccount() {
    const {backendUrl, userData, logout, setUserData, isLoggedIn, sendVerificationOtp, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const [editableData, setEditableData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        tel: userData?.tel || "",
    });

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (userData) {
            setEditableData({
                name: userData.name || "",
                email: userData.email || "",
                tel: userData.tel || "",
            });
        } else {
            navigate("/");
        }
    }, [userData]);



    const handleSavePassword = async () => {
        let hasErrors = false;
        setErrors({password: "", newPassword: "", confirmPassword: ""})
        if (!password) {
            setErrors((prev) => ({ ...prev, password: "* Current Password is required." }));
            hasErrors = true;
        } else if (password.length < 6) {
            setErrors((prev) => ({ ...prev, password: "* Password must be at least 6 characters long." }));
            hasErrors = true;
        }

        if (!newPassword) {
            setErrors((prev) => ({ ...prev, newPassword: "* New Password is required." }));
            hasErrors = true;
        } else if (newPassword.length < 6) {
            setErrors((prev) => ({ ...prev, newPassword: "* Password must be at least 6 characters long." }));
            hasErrors = true;
        } else if (!/[a-zA-Z]/.test(newPassword)) {
            setErrors((prev) => ({ ...prev, newPassword: "* Password must contain at least one letter." }));
            hasErrors = true;
        } else if (!/[0-9]/.test(newPassword)) {
            setErrors((prev) => ({ ...prev, newPassword: "* Password must contain at least one number." }));
            hasErrors = true;
        }

        if (!confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "* Confirm new password is required." }));
            hasErrors = true;
        } else if (newPassword !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "* Passwords do not match." }));
            hasErrors = true;
        }

        if (hasErrors) return;

        const requestData = {
            password: password,
            newPassword: newPassword,
        }

        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/user/password`, requestData);
            if (data.success) {
                console.log(data);
                toast.success("Successfully updated password!");
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const handleSaveChanges = async () => {
        let hasError = false;
        setErrors({ name: "", email: "", tel: "" });

        if (!editableData.name.trim()) {
            setErrors((prev) => ({ ...prev, name: "* Name is required." }));
            hasError = true;
        }

        if (!editableData.email.trim()) {
            setErrors((prev) => ({ ...prev, email: "* Email is required." }));
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(editableData.email)) {
            setErrors((prev) => ({ ...prev, email: "* Invalid email format." }));
            hasError = true;
        }

        if (!editableData.tel.trim()) {
            setErrors((prev) => ({ ...prev, tel: "* Phone number is required." }));
            hasError = true;
        } else if (!/^\d+$/.test(editableData.tel)) {
            setErrors((prev) => ({ ...prev, tel: "* Invalid phone number format. Only digits are allowed." }));
            hasError = true;
        } else if (editableData.tel.length !== 10) {
            setErrors((prev) => ({ ...prev, tel: "* Phone number must be exactly 10 digits." }));
            hasError = true;
        }

        if (hasError) return;

        const requestBody = {
            name: editableData.name,
            email: editableData.email,
            tel: editableData.tel
        };

        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/user/data/`, requestBody);
            if(data.success) {
                toast.success("Successfully updated user data!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        userData ? (
            <div className={styles.myAccountContainer}>
                <h1 className={styles.title}>{`Hi ${userData.name.split(" ")[0]} !`}</h1>

                <div className={styles.userDataSection}>
                    <h2 className={styles.subtitle}>User Information</h2>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter your name"
                            value={editableData.name}
                            onChange={(e) =>
                                setEditableData({ ...editableData, name: e.target.value })
                            }
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Enter your email"
                            value={editableData.email}
                            onChange={(e) =>
                                setEditableData({ ...editableData, email: e.target.value })
                            }
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Phone number</label>
                        <input
                            className={styles.input}
                            type="tel"
                            placeholder="Enter your phone number"
                            value={editableData.tel || ""}
                            onChange={(e) =>
                                setEditableData({ ...editableData, tel: e.target.value })
                            }
                        />
                        {errors.tel && <p className={styles.error}>{errors.tel}</p>}
                    </div>

                    <button className={styles.saveButton} onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </div>
                <div className={styles.userDataSection}>
                    <h2 className={styles.subtitle}>Change password</h2>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Current Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && <p className={styles.error}>{errors.newPassword}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                    </div>
                    <button className={styles.saveButton} onClick={handleSavePassword}>
                        Save New Password
                    </button>
                </div>

                <div className={styles.actionsSection}>
                    <h2 className={styles.subtitle}>Account Actions</h2>
                    <div className={styles.actionsButtons}>
                        {!userData.isVerified && (
                            <button
                                className={styles.verifyEmailButton}
                                onClick={() => navigate('/verify-email')}
                            >
                                Verify Email
                            </button>
                        )}
                        <button className={styles.logoutButton} onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <div className={styles.myAccountContainer}>
                <div className={styles.loading}>
                    <CircularProgress />
                </div>
            </div>
        )
    );
}

export default MyAccount;
