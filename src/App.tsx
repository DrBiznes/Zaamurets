import React from 'react'
import { RailSymbol, Github } from 'lucide-react'
import { Train, TrainCar } from 'zaamurets'
import Marquee from 'react-fast-marquee'
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
            <a href="#" className="nav-logo-link">
              <RailSymbol size={24} className="nav-train-icon" />
              <span>Zaamurets</span>
            </a>
          </div>
          <div className="nav-links">
            <a href="#train-creator">Train Creator</a>
            <a href="#docs">Documentation</a>
            <a href="#examples">Examples</a>
            <a href="https://github.com/DrBiznes/Zaamurets" className="github-link">
              <Github size={18} />
              <span>GitHub</span>
              <span className="external-arrow">↗</span>
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
          <div className="footer-train">
            <Marquee speed={40} autoFill pauseOnHover>
              <Train animated={true} additionalTrackSegments={5}>
                <TrainCar>
                  <a href="https://github.com/DrBiznes">
                    <img src="https://img.shields.io/badge/GitHub-DrBiznes-black?style=flat&logo=github" alt="GitHub" />
                  </a>
                </TrainCar>
                <TrainCar>
                  <a href="https://twitter.com/DrBiznez">
                    <img src="https://img.shields.io/badge/Twitter-DrBiznez-1DA1F2?style=flat&logo=x" alt="Twitter" />
                  </a>
                </TrainCar>
                <TrainCar>
                  <a href="https://jamino.me">
                    <img src="https://img.shields.io/badge/Website-jamino.me-4CAF50?style=flat&logo=googlechrome&logoColor=white" alt="Website" />
                  </a>
                </TrainCar>
              </Train>
            </Marquee>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Jamino. MIT License.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App