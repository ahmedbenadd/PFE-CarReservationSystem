import styles from "../styles/Signup.module.css";
import {Link , useLocation } from "react-router-dom";

function Signup() {
    return (
        <div className="signup-container" >
            <h1>SignUp</h1>
            <form>
                <input type="text" placeholder="Enter yourname" />
                <input type="email" placeholder="Enter your email" />
                <input type="password" placeholder="Create password" />
                <input type="password" placeholder="Confirm password" />
                <div className="policy">

                    <input type="checkbox" />
                    <h3>I accept all terms & condition</h3>
                </div>
                <button type="submit">SignUp</button>
                <div className="text">
                    <h4>
                        Already have an account? <Link to ="/Login">Login</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
}

export default Signup;
