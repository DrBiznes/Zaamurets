import React, { useState } from 'react'
import { Train, TrainCar } from 'zaamurets'
import Marquee from 'react-fast-marquee'
import { Copy, Check, TrainFrontIcon } from 'lucide-react'
import Documentation from './components/Documentation'
import Examples from './components/Examples'
import './App.css'

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install zaamurets');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo">
            <TrainFrontIcon size={24} className="nav-train-icon" />
            <span>Zaamurets</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#docs">Documentation</a>
            <a href="#examples">Examples</a>
            <a href="https://github.com/zaamurets/zaamurets" className="github-link">
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Zaamurets</h1>
            <p className="hero-description">
              Create delightful, customizable armored train animations to carry your shields.io badges.
            </p>
          </div>
          
          <div className="hero-actions">
            <div className="install-command">
              <code>npm install zaamurets</code>
              <button onClick={handleCopy} className="copy-button">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            
            <div className="hero-buttons">
              <a href="#gif-generator" className="primary-button">Gif Generator</a>
              <a href="#docs" className="secondary-button">Docs</a>
            </div>
          </div>

          {/* Demo Train */}
          <div className="hero-demo">
            <Train animated={true}>
              <TrainCar>
                <a href="https://www.npmjs.com/package/zaamurets">
                  <img src="https://img.shields.io/npm/v/zaamurets?style=flat-square&logo=npm" alt="npm version" />
                </a>
              </TrainCar>
            </Train>
          </div>
        </div>
      </section>

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

      {/* Documentation Section */}
      <Documentation />

      {/* Examples Section */}
      <Examples />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Train animated={true}>
              <TrainCar>🚂</TrainCar>
            </Train>
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