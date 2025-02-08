import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>About Us</h2>
      <p>
        Welcome to our AI-powered meal planning platform! Our mission is to help users make better food choices by providing
        personalized meal plans, budget tracking, local grocery deals, and creative recipes. We believe that eating healthy
        and saving money should be easy and accessible to everyone.
      </p>
      <p>
        Our team is passionate about nutrition, technology, and making a positive impact on people's lives.
        We continuously work to improve our services and bring you the best experience possible.
      </p>
      <p>
        Thank you for being part of our journey. If you have any questions, feel free to reach out!
      </p>
      
      <button onClick={() => navigate('/')} className="btn">
        Back to Home
      </button>
    </div>
  );
};

export default AboutUs;