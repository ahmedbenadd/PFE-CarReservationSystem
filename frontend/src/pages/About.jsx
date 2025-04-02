import React, { useEffect } from "react";
import styles from "../styles/About.module.css";
import {useNavigate} from "react-router-dom";

const About = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navigate = useNavigate();

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About AutoGo</h1>

            {/* Our Story Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Story</h2>
                <p className={styles.sectionText}>
                    At <strong>AutoGo</strong>, we believe every journey deserves a smooth start. Founded in 2018, our mission is to simplify car rentals by offering a fast, transparent, and hassle-free experience.
                </p>
            </section>

            {/* Our Mission Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.sectionText}>
                    Our mission is simple: to give you the freedom to move effortlessly. Whether you need a car for business, a family vacation, or just a day trip, <strong>AutoGo</strong> offers a wide selection of vehicles at competitive prices.
                </p>
            </section>

            {/* Why Choose AutoGo Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Why Choose AutoGo?</h2>
                <ul className={styles.list}>
                    <li>📱 <strong>Easy Booking</strong>: Reserve your car online in just a few clicks, no paperwork required.</li>
                    <li>💵 <strong>Competitive Pricing</strong>: Transparent pricing with no hidden fees.</li>
                    <li>🔄 <strong>Flexibility</strong>: Free cancellations and easy modifications.</li>
                    <li>👩‍💻 <strong>Exceptional Customer Service</strong>: Our team is here to help you every step of the way.</li>
                </ul>
            </section>

            {/* Our Team Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Team</h2>
                <p className={styles.sectionText}>
                    At <strong>AutoGo</strong>, we are a passionate team of professionals dedicated to your satisfaction. From our rental experts to our customer support team, we work together to deliver the best experience possible.
                </p>
            </section>

            {/* Testimonials Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
                <blockquote className={styles.quote}>
                    "I loved my experience with AutoGo! The booking process was seamless, and the car was perfect for our road trip." – <strong>Wiame L.</strong>
                </blockquote>
                <blockquote className={styles.quote}>
                    "Amazing customer service and very competitive prices. Highly recommended!" – <strong>Ahmed D.</strong>
                </blockquote>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
                <p className={styles.sectionText}>
                    Have questions or need assistance? Our team is here for you!
                </p>
                <ul className={styles.list}>
                    <li>📞 <strong>Phone:</strong> +212 555 55 555</li>
                    <li>📧 <strong>Email:</strong> contact@autogo.com</li>
                    <li>📍 <strong>Address:</strong> ADDRESS</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Ready to Book Your Car?</h2>
                <p className={styles.sectionText}>
                    Explore our wide selection of vehicles and book today for your next adventure. At <strong>AutoGo</strong>, we make car rentals simple, fast, and enjoyable.
                </p>
                <button className={styles.button} onClick={() => navigate("/")}>Book Now</button>
            </section>
        </div>
    );
};

export default About;