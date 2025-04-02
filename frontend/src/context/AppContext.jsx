import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = "http://localhost:5000";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                console.log(data);
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUserData(null);
            console.log(error);
            toast.error(error.message);
        }
    }

    const getAuthState = async () => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.get(`${backendUrl}/api/auth/is-authenticated`);
            if (data.success) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
                toast.error(data.message);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUserData(null);
            console.log(error);
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/auth/logout`);
            if (data.success) {
                setIsLoggedIn(false);
                setUserData(null);
                toast.info("Logged out",{autoClose: 700});
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during logout.");
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        getAuthState,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };