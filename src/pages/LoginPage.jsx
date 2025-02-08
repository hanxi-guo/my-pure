import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/LoginPage.css';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="login-page">
      <Navbar />
      <div className="animate-background"></div>
      
      {!isAuthenticated ? (
        <div className="landing-content">
          {/* Hero Section */}
          <div className="hero-section">
    <div className="intro-card">
      <h1 className="gradient-title">PurePlate</h1>
      <h2 className="subtitle">Welcome to your Personal AI-Powered Meal Planner! 🍽️✨</h2>
      <p className="hero-description">
      We’re thrilled to have you here! Get ready for stress-free, budget-friendly, and delicious meal planning tailored just for you. 
      Whether you're looking to save time, eat healthier, or stick to a budget, we've got you covered.
      </p>
      <button className="login-button" onClick={() => loginWithRedirect()}>
        Get Started
      </button>
    </div>
  </div>

          {/* Features Section */}
          <div className="features-section">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>AI-Powered Meal Planning </h3>
                <p>Say goodbye to decision fatigue! Our smart AI curates personalized meal plans tailored to your taste, budget, and lifestyle.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰 </div>
                <h3>Budget-Friendly Choices </h3>
                <p>Stay in control of your spending with optimized meal plans that make every dollar count.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Seamless & Easy to Use</h3>
                <p>ign up in seconds, customize your preferences, and let our AI do the rest—effortless meal planning at your fingertips.</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="testimonials-section">
            <h2 className="section-title">What Our Users Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p>"This platform has completely changed the way I plan my meals! With AI-powered recommendations that fit my taste and budget, I never have to worry about what to cook next.
                     It's easy, smart, and saves me so much time!"</p>
                <div className="testimonial-author">- Sarah J.</div>
              </div>
              <div className="testimonial-card">
                <p>"I love how I can customize everything—my dietary preferences, portion sizes, and even my spending limits. It feels like having a personal nutritionist and budget manager in one!"</p>
                <div className="testimonial-author">- Michael R.</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-preview">
          <div className="welcome-section">
            <h1 className="gradient-title">Welcome back, {user?.name}!</h1>
            <p className="welcome-message">We're glad to see you again.</p>
            <div className="quick-stats">
              <div className="stat-card">
                <h3>Recent Activity</h3>
                <p>You have 3 pending tasks</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming</h3>
                <p>2 meetings scheduled today</p>
              </div>
            </div>
            <button 
              className="login-button"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;