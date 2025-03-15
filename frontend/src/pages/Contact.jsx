import React, {useState} from 'react';
import '../styles/Contact.module.css';

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
        <div className="contact-container">
            {/* Section Hero */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Contact Us</h1>
                    <p className="hero-text">We're here to help! Reach out to us for any questions or inquiries.</p>
                </div>
            </section>

            {/* Formulaire de Contact */}
            <section className="contact-form-section">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </section>


            <section className="contact-info-section">
                <h2>Our Contact Information</h2>
                <div className="contact-info-grid">
                    <div className="contact-info-card">
                        <span className="contact-icon">📞</span>
                        <h3>Phone</h3>
                        <p>+212 555 55 555</p>
                    </div>
                    <div className="contact-info-card">
                        <span className="contact-icon">📧</span>
                        <h3>Email</h3>
                        <p>contact@autogo.com</p>
                    </div>
                    <div className="contact-info-card">
                        <span className="contact-icon">📍</span>
                        <h3>ADRESSS</h3>
                        <p>l'internat dyl l'EST</p>
                    </div>
                </div>
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

