import { Link, useLocation } from "react-router-dom"; // Import useLocation
import Logo from "../images/logo/logo_blue_nobg.png";
import styles from "../styles/Navbar.module.css";

function Navbar() {
    const location = useLocation(); // Get the current location

    return (
        <>
            <nav>
                <div className={styles.navbar}>
                    <div className={styles.navbarImg}>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                            <img src={Logo} alt="AUTOGO" />
                        </Link>
                    </div>
                    <ul className={styles.navbarLinks}>
                        <li>
                            <Link
                                className={`${styles.homeLink} ${
                                    location.pathname === "/" ? styles.activePage : ""
                                }`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={` ${
                                    location.pathname === "/models" ? styles.activePage : ""
                                }`}
                                to="/models"
                            >
                                Cars
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/about" ? styles.activePage : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/testimonials" ? styles.activePage : ""
                                }`}
                                to="/testimonials"
                            >
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    location.pathname === "/contact" ? styles.activePage : ""
                                }`}
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.navbarButtons}>
                        <Link className={styles.signInButton} to="/">
                            Sign In
                        </Link>
                        <Link className={styles.registerButton} to="/">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;