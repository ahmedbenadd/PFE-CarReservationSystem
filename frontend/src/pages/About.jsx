import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
    return (
        <div className="about-page">
            <h1>About AutoGo</h1>
            <div className="about">
                <h2>Our Story</h2>
                <p>
                    At <strong>AutoGo</strong>, we believe every journey deserves a smooth start. Founded in 2018, our mission is to simplify car rentals by offering a fast, transparent, and hassle-free experience.
                </p>
            </div>

            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    Our mission is simple: to give you the freedom to move effortlessly. Whether you need a car for business, a family vacation, or just a day trip, <strong>AutoGo</strong> offers a wide selection of vehicles at competitive prices.
                </p>
            </section>

            <section className="about-section">
                <h2>Why Choose AutoGo?</h2>
                <ul>
                    <li>📱 <strong>Easy Booking</strong>: Reserve your car online in just a few clicks, no paperwork required.</li>
                    <li>💵 <strong>Competitive Pricing</strong>: Transparent pricing with no hidden fees.</li>
                    <li>🔄 <strong>Flexibility</strong>: Free cancellations and easy modifications.</li>
                    <li>👩‍💻 <strong>Exceptional Customer Service</strong>: Our team is here to help you every step of the way.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Our Team</h2>
                <p>
                    At <strong>AutoGo</strong>, we are a passionate team of professionals dedicated to your satisfaction. From our rental experts to our customer support team, we work together to deliver the best experience possible.
                </p>
            </section>

            <section className="about-section">
                <h2>What Our Customers Say</h2>
                <blockquote>
                    "I loved my experience with AutoGo! The booking process was seamless, and the car was perfect for our road trip." – <strong>Wiame L.</strong>
                </blockquote>
                <blockquote>
                    "Amazing customer service and very competitive prices. Highly recommended!" – <strong>Ahmed D.</strong>
                </blockquote>
            </section>

            <section className="about-section">
                <h2>Our Partners</h2>
                <p>
                    We collaborate with top car rental providers and insurers to bring you the best service. Some of our partners include:
                </p>
                <ul>
                    <li>Partner 1</li>
                    <li>Partner 2</li>
                    <li>Partner 3</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Contact Us</h2>
                <p>
                    Have questions or need assistance? Our team is here for you!
                </p>
                <ul>
                    <li>📞 <strong>Phone:</strong> +212 555 55 555</li>
                    <li>📧 <strong>Email:</strong> contact@autogo.com</li>
                    <li>📍 <strong>Address:</strong> ADRESSS</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Ready to Book Your Car?</h2>
                <p>
                    Explore our wide selection of vehicles and book today for your next adventure. At <strong>AutoGo</strong>, we make car rentals simple, fast, and enjoyable.
                </p>
                <button className="cta-button">Book Now</button>
            </section>

            <footer className="about-footer">
                <p>
                    <a href="/legal">Legal Information</a> | <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
                </p>
            </footer>
        </div>
    );
};

export default About;