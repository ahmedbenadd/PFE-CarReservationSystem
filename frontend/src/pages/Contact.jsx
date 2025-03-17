import React, {useState} from 'react';
import styles from '../styles/Contact.module.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
        console.log('Form Data Submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({name: '', email: '', message: ''}); // Réinitialiser le formulaire
    };

    return (
        <div >
            <h1 className={styles.h1}>Contact Us</h1>
            <div className={styles.form}>
                <h2 className={styles.h2}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} >
                    <div className={styles.txt1}>Name</div>
                    <input
                            className={styles.cadre}
                            placeholder={"Enter your name"}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                    />
                    <div className={styles.txt2}>Email</div>
                    <input
                            className={styles.cadre}
                            placeholder={"Enter your email"}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                    />
                    <div className={styles.txt3}>Message</div>
                    <textarea
                            className={styles.cadre}
                            placeholder={"Enter your message"}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="7"
                            required
                    ></textarea>
                    <button type="submit" className={styles.btn}>Send Message</button>
                </form>
            </div>


            <section className={styles.contact}>
                <h2>Our Contact Information </h2>
                <p >📞</p>
                <p>+212 555 55 555</p>
                <p>📧</p>
                <p>contact@autogo.com</p>
            </section>


            <section className="map-section">
                <h2>Find Us on the Map</h2>
                <div className="map-container">
                    <iframe>
                        src={"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3465.582021780696!2d-9.739529925782778!3d29.702895634674856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDQyJzEwLjQiTiA5wrA0NCcxMy4wIlc!5e0!3m2!1sfr!2sma!4v1742053808384!5m2!1sfr!2sma"}
                        width={"600"}
                        height={"450"}
                        style={"border:0;"}
                        loading={"lazy"}
                        referrerPolicy={"no-referrer-when-downgrade"}
                </iframe>
        </div>
</section>
</div>
)
    ;
};

export default ContactPage;

