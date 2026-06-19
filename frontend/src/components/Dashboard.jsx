import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.name || user?.email}!</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>12</h3>
                <p>Total Tests</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>8</h3>
                <p>Completed</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>85%</h3>
                <p>Average Score</p>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <button className="action-btn">
                <span className="action-icon">📝</span>
                Start New Test
              </button>
              <button className="action-btn">
                <span className="action-icon">📈</span>
                View Progress
              </button>
              <button className="action-btn">
                <span className="action-icon">📚</span>
                Study Materials
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
