import React, { useEffect, useState } from "react";
import styles from "../styles/Contact.module.css";
import axios from "axios";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitMessage("");

        try {
            const { data } = await axios.post("http://localhost:5000/contacts", formData);

            if (data.success) {
                setSubmitMessage("Thank you for contacting us! We will get back to you soon.");
                setFormData({ name: "", email: "", message: "" }); // Reset the form
            } else {
                setSubmitMessage("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            setSubmitMessage("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>

            {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}

            <div className={styles.contentWrapper}>
                <div className={styles.formSection}>
                    <h2 className={styles.formTitle}>Send Us a Message</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Name
                            </label>
                            <input
                                className={styles.input}
                                placeholder="Enter your name"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                aria-label="Your Name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                className={styles.input}
                                placeholder="Enter your email"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-label="Your Email"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Enter your message"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="7"
                                required
                                aria-label="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                <div className={styles.mapSection}>
                    <h2 className={styles.mapTitle}>Find Us on the Map</h2>
                    <div className={styles.mapContainer}>
                        <iframe
                            title="Company Location on Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3465.582021780696!2d-9.739529925782778!3d29.702895634674856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDQyJzEwLjQiTiA5wrA0NCcxMy4wIlc!5e0!3m2!1sfr!2sma!4v1742053808384!5m2!1sfr!2sma"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;