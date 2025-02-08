import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="dashboard-layout">
      {/* 侧边栏导航 */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src="/logo.PNG" alt="Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Projects</li>
            <li>Calendar</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* 主要内容区域 */}
      <main className="dashboard-main">
        {/* 顶部导航栏 */}
        <header className="dashboard-header">
          <div className="header-search">
            <input type="search" placeholder="Search..." />
          </div>
          <div className="header-user">
            <span className="user-name">{user?.name}</span>
            <img src={user?.picture} alt="Profile" className="user-avatar" />
            <button className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </button>
          </div>
        </header>

        {/* 仪表板内容 */}
        <div className="dashboard-content">
          <div className="dashboard-grid">
            {/* 统计卡片 */}
            <div className="stat-card">
              <h3>Total Projects</h3>
              <p className="stat-number">12</p>
              <p className="stat-trend positive">↑ 23%</p>
            </div>
            <div className="stat-card">
              <h3>Active Tasks</h3>
              <p className="stat-number">34</p>
              <p className="stat-trend positive">↑ 15%</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p className="stat-number">89</p>
              <p className="stat-trend positive">↑ 42%</p>
            </div>

            {/* 活动列表 */}
            <div className="activity-card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li>
                  <span className="activity-time">2h ago</span>
                  <span className="activity-text">Completed Project Alpha</span>
                </li>
                <li>
                  <span className="activity-time">5h ago</span>
                  <span className="activity-text">Updated Task Status</span>
                </li>
                {/* 更多活动项目 */}
              </ul>
            </div>

            {/* 项目进度 */}
            <div className="projects-card">
              <h3>Project Progress</h3>
              <div className="project-list">
                {/* 项目进度条 */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;