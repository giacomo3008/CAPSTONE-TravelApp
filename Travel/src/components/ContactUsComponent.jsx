import React, { useState } from 'react';
import '../style/contactus.css';

const ContactUsComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Qui puoi aggiungere invio dati a un server/email service
        console.log('Messaggio inviato:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <section className="contact-hero">
                <h1>📬 Get in Touch</h1>
                <p>We’d love to hear from you — whether it’s a question, feedback, or just to say hello!</p>
            </section>

            <section className="contact-form-section">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        required
                        onChange={handleChange}
                        placeholder="Your name"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        required
                        onChange={handleChange}
                        placeholder="How can we help you?"
                    ></textarea>

                    <button type="submit">Send Message</button>

                    {submitted && <p className="success-message">✅ Message sent! We’ll get back to you soon.</p>}
                </form>
            </section>
        </div>
    );
};

export default ContactUsComponent;
