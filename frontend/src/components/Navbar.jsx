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
                            <img src={Logo} alt="Auto GO" />
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
                                    location.pathname === "/cars" ? styles.activePage : ""
                                }`}
                                to="/cars"
                            >
                                Cars
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
                    </ul>
                    <div className={styles.navbarButtons}>
                        <Link to="/login" className={styles.signInButton}>
                            Login
                        </Link>
                        <Link to="/signup" className={styles.registerButton}>
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;