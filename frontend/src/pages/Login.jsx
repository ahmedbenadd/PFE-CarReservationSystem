import styles from '../styles/Login.module.css'
import {Link, useLocation } from "react-router-dom";

function Login() {
    return (
        <div className="login-container">
        <h1>Login</h1>
            <form>
                <input type="email" placeholder="Enter your email" />
                <input type="password" placeholder="Enter your password" />
                <button type="submit">Login</button>
                <div className="text">
                    <h4>
                        Don't have an account? <Link to ="/Signup">Signup</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Login;