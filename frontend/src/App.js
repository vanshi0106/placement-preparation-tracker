import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import TechnicalRound from './components/TechnicalRound';
import AptitudePrep from './components/AptitudePrep';
import CodingLearning from './components/CodingLearning';
import ResumeBuilder from './components/ResumeBuilder';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Homepage />} />
            <Route path="/technical" element={<TechnicalRound />} />
            <Route path="/aptitude" element={<AptitudePrep />} />
            <Route path="/coding" element={<CodingLearning />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            
            {/* Authentication Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="not-found">
                <div className="not-found-content">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
