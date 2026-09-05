import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">▶</span>
          VidLearn
        </Link>

        <nav className="nav-links">
          <Link to="/login" className="login-link">
            Sign In
          </Link>

          <Link to="/register" className="register-link">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">
              Interactive Video Learning
            </span>

            <h1>
              Learn Smarter.
              <br />
              <span>Test Your Knowledge.</span>
            </h1>

            <p>
              Watch engaging video lessons, answer interactive questions,
              track your progress, and continue learning right where you
              left off.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button">
                Start Learning →
              </Link>

              <Link to="/login" className="secondary-button">
                Sign In
              </Link>
            </div>
          </div>

          {/* Video Preview */}
          <div className="hero-visual">
            <div className="video-card">
              <div className="video-preview">
                <div className="play-button">▶</div>
              </div>

              <div className="video-info">
                <div>
                  <h3>Introduction to Web Development</h3>
                  <p>Interactive Learning Course</p>
                </div>

                <span className="progress-value">65%</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <div className="section-heading">
            <span>FEATURES</span>
            <h2>Everything you need to learn effectively</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3>Interactive Videos</h3>
              <p>
                Learn through video content with questions placed at
                important moments.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Interactive Quizzes</h3>
              <p>
                Answer single choice, multiple choice, and short answer
                questions while watching.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>
                Monitor your learning progress and see how much of each
                assigned video is completed.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏯️</div>
              <h3>Resume Learning</h3>
              <p>
                Continue from exactly where you stopped, even after
                refreshing the page.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to start learning?</h2>
          <p>
            Create your account and begin your interactive learning journey.
          </p>

          <Link to="/register" className="primary-button">
            Create Free Account →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>© 2026 VidLearn</span>
        <span>Video Learning Platform</span>
      </footer>
    </div>
  );
};

export default Home;