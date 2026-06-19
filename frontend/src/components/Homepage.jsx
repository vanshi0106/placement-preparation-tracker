import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Ace Your <span className="highlight">Placement Tests</span>
            </h1>
            <p className="hero-subtitle">
              Comprehensive preparation platform with practice tests, study materials, 
              and performance analytics to help you land your dream job.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Start Preparing Now</Link>
              <Link to="/login" className="btn btn-secondary">Already have an account?</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="graphic-card">📊</div>
              <div className="graphic-card">💻</div>
              <div className="graphic-card">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Practice Tests</h3>
              <p className="feature-description">
                Extensive collection of aptitude tests, coding challenges, and technical questions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Detailed analytics and performance insights to track your improvement over time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Personalized Learning</h3>
              <p className="feature-description">
                AI-powered recommendations based on your strengths and areas for improvement.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Expert Support</h3>
              <p className="feature-description">
                Get guidance from industry experts and connect with fellow students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <div className="quick-access-container">
          <h2 className="section-title">Start Your Journey</h2>
          <div className="access-grid">
            <Link to="/technical" className="access-card">
              <div className="access-icon">🔧</div>
              <h3 className="access-title">Technical Round</h3>
              <p className="access-description">
                System design, data structures, algorithms, and database concepts.
              </p>
              <span className="access-arrow">→</span>
            </Link>
            
            <Link to="/aptitude" className="access-card">
              <div className="access-icon">🧠</div>
              <h3 className="access-title">Aptitude Preparation</h3>
              <p className="access-description">
                Logical reasoning, quantitative aptitude, and verbal abilities.
              </p>
              <span className="access-arrow">→</span>
            </Link>
            
            <Link to="/coding" className="access-card">
              <div className="access-icon">💻</div>
              <h3 className="access-title">Coding Learning</h3>
              <p className="access-description">
                Programming languages, coding patterns, and interview prep.
              </p>
              <span className="access-arrow">→</span>
            </Link>
            
            <Link to="/resume" className="access-card">
              <div className="access-icon">📄</div>
              <h3 className="access-title">Resume Builder</h3>
              <p className="access-description">
                Professional resume templates that get you noticed by recruiters.
              </p>
              <span className="access-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Students Prepared</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Practice Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-subtitle">Join thousands of students who have successfully prepared for placements</p>
          <Link to="/signup" className="btn btn-primary btn-large">Create Free Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/logo.jpg" 
                alt="PlacementPrep Logo" 
                className="footer-logo-img"
              />
              <span className="logo-text">PlacementPrep</span>
            </div>
            <div className="footer-links">
              <Link to="/technical" className="footer-link">Technical Round</Link>
              <Link to="/aptitude" className="footer-link">Aptitude Prep</Link>
              <Link to="/coding" className="footer-link">Coding Learning</Link>
              <Link to="/resume" className="footer-link">Resume Builder</Link>
            </div>
            <p className="footer-text">© 2025 PlacementPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
