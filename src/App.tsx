import React from 'react'
import { RailSymbol } from 'lucide-react'
import Documentation from './components/Documentation'
import Examples from './components/Examples'
import TrainCreator from './components/TrainCreator'
import Hero from './components/Hero'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo">
            <RailSymbol size={24} className="nav-train-icon" />
            <span>Zaamurets</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#train-creator">Train Creator</a>
            <a href="#docs">Documentation</a>
            <a href="#examples">Examples</a>
            <a href="https://github.com/zaamurets/zaamurets" className="github-link">
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-content">
          <h2>Why Zaamurets?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Customizable</h3>
              <p>Fully customizable trains with support for custom cars, animations, and themes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightweight</h3>
              <p>Zero dependencies, small bundle size, and optimized performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works seamlessly across all devices and screen sizes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Easy to Use</h3>
              <p>Simple API with TypeScript support and comprehensive documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Train Creator Section */}
      <section id="train-creator">
        <TrainCreator />
      </section>

      {/* Documentation Section */}
      <Documentation />

      {/* Examples Section */}
      <Examples />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span>Zaamurets</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/zaamurets/zaamurets">GitHub</a>
            <a href="#docs">Documentation</a>
            <a href="#examples">Examples</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Zaamurets. MIT License.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App