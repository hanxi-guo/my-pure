import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your secure dashboard.</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
    </div>
  );
};

export default Dashboard;