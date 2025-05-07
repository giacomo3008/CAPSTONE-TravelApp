import React from 'react';
import '../style/aboutus.css';

const AboutUsComponent = () => {
    return (
        <div className="about-container">
            <section className="hero-section">
                <h1>✈️ Discover the world with Travel</h1>
                <p>We’re not just a booking platform. We’re your companion in discovering places that feel like home, even when you're far away.</p>
            </section>

            <section className="mission-section">
                <div className="text">
                    <h2>🌟 Why we created Travel</h2>
                    <p>
                        Travel was born from a simple idea: that everyone deserves to experience the beauty of the world, without hassle.
                        Whether you're planning a weekend escape or a month-long adventure, we make it easy to find places you'll love staying in.
                        Our team has poured passion, code, and coffee into building a platform that's intuitive, secure, and full of hidden gems.
                    </p>
                </div>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/037/248/582/small/ai-generated-travelling-to-thailand-advertisment-background-with-copy-space-free-photo.jpg" alt="Why we travel" />
            </section>

            <section className="cta-section">
                <h2>🌍 Ready to explore?</h2>
                <p>Join thousands of travelers who use Travel to book, discover, and live experiences they'll never forget.</p>
                <a href="/" className="cta-button">Start your journey</a>
            </section>
        </div>
    );
};

export default AboutUsComponent;
