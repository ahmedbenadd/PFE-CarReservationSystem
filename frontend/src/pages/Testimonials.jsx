import React from "react";
import styles from "../styles/testimonials.module.css";

function Testimonials() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToTop();
    }, []);

    const testimonialsData = [
        {
            id: 1,
            name: "Ibrahim Ahmed",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            message:
                "The service was excellent! I highly recommend it to everyone.",
            rating: "★★★★★",
        },
        {
            id: 2,
            name: "Amal Bader",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            message:
                "Customer support was outstanding, and the product quality is top-notch.",
            rating: "★★★★☆",
        },
        {
            id: 3,
            name: "Youssef Ali",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            message:
                "An amazing experience! I will definitely use their services again.",
            rating: "★★★★★",
        },
        {
            id: 4,
            name: "Fatima Hassan",
            image: "https://randomuser.me/api/portraits/women/56.jpg",
            message:
                "The service was good, but there’s room for improvement in delivery speed.",
            rating: "★★★☆☆",
        },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>What Our Customers Say</h1>
            <div className={styles.testimonialsGrid}>
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className={styles.testimonialCard}>
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className={styles.avatar}
                        />
                        <p className={styles.message}>{testimonial.message}</p>
                        <div className={styles.rating}>{testimonial.rating}</div>
                        <p className={styles.name}>
                            <strong>- {testimonial.name}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;