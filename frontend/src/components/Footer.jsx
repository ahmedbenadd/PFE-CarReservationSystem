import styles from '../styles/Footer.module.css'
import {Link} from "react-router-dom";
import locationIcon from "../images/footer/location.png"
import telIcon from "../images/footer/tel.png"
import emailIcon from "../images/footer/email.png"

function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.footerContent}>
                        <ul className={styles.info}>
                            <li>
                                Auto <span>GO</span>
                            </li>
                            <li className={styles.text}>
                                We offers a big range of vehicles for all your driving needs. We have the perfect car to
                                meet your needs.
                            </li>
                            <li>
                                <a href="https://g.co/kgs/geD4rsq">
                                    <img className={styles.icons}  src={locationIcon} alt="location" />&nbsp;
                                    Casablanca
                                </a>
                            </li>
                            <li>
                                <a href="tel:1234567890">
                                    <img className={styles.icons}  src={telIcon} alt="tel" />&nbsp;
                                    +212 599999999
                                </a>
                            </li>
                            <li>
                                <a href="mailto:main.autogo@gmail.com">
                                    <img className={styles.icons} src={emailIcon} alt="email" />&nbsp;
                                    main.autogo@gmail.com
                                </a>
                            </li>
                        </ul>
                        <ul className={styles.links}>
                            <li>Links</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Cars</Link></li>
                            <li><Link to="/testimonials">Testimonials</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        <ul className={styles.working}>
                            <li>Working Hours</li>
                            <li>Mon - Fri: 9:00AM - 9:00PM</li>
                            <li>Sat: 9:00AM - 6:00PM</li>
                            <li>Sun: Closed</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;