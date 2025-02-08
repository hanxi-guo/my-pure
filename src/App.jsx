import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserOnboarding from './pages/UserOnboarding';
import AboutUs from './pages/AboutUs';
import Features from './pages/feature';
import { getUserPreferences } from './service/firebase/firestore';

// 检查用户是否已注册的组件
const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const userData = await getUserPreferences(user.sub);
          setIsRegistered(!!userData); // 如果有用户数据，则认为已注册
        } catch (error) {
          console.error('Error checking registration:', error);
          setIsRegistered(false);
        }
      }
      setCheckingRegistration(false);
    };

    checkRegistration();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading || checkingRegistration) {
    return <div>Loading...</div>;
  }

  // 如果未注册，重定向到注册页面
  if (!isRegistered && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  // 如果已注册且在注册页面，重定向到仪表板
  if (isRegistered && window.location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/onboarding"
          element={
            <AuthenticatedRoute>
              <UserOnboarding />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <DashboardPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;