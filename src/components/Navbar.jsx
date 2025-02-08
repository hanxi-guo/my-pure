import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/logo.PNG" alt="Logo" className="logo-img" />
        <span className="logo-text">PurePlate</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;