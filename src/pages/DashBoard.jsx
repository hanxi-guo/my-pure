import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>This is a secure area. Only authorized users can access it.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;