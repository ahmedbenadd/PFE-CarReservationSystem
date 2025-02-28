import { Link } from "react-router-dom";
import Logo from "../images/logo/test3.png";
import styles from "../styles/Navbar.module.css";

function Navbar() {

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
                            <Link className={styles.homeLink} to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.aboutLink} to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.modelsLink} to="/models">
                                Cars
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.testiLink} to="/testimonials">
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.contactLink} to="/contact">
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