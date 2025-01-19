import React, { useState } from 'react'
import { TrainFrontIcon } from 'lucide-react'
import Documentation from './components/Documentation'
import Examples from './components/Examples'
import GifGenerator from './components/GifGenerator'
import Hero from './components/Hero'
import './App.css'

const App: React.FC = () => {
  const [generatedGif, setGeneratedGif] = useState<string | null>(null);

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
            <a href="#gif-generator">GIF Generator</a>
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

      {/* GIF Generator Section */}
      <GifGenerator onGifGenerated={setGeneratedGif} />

      {/* Generated GIF Preview */}
      {generatedGif && (
        <section className="generated-gif">
          <div className="section-content">
            <h2>Your Generated GIF</h2>
            <div className="gif-preview">
              <img src={generatedGif} alt="Generated Train Animation" />
              <a 
                href={generatedGif} 
                download="zaamurets-train.gif"
                className="download-button"
              >
                Download GIF
              </a>
            </div>
          </div>
        </section>
      )}

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