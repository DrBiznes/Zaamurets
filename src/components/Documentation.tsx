import React, { useState } from 'react';

interface Section {
  title: string;
  content: JSX.Element;
}

type SectionKey = 'getting-started' | 'components' | 'types' | 'examples' | 'guidelines';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('getting-started');

  const sections: Record<SectionKey, Section> = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <>
          <p>Zaamurets is a React component library for creating ASCII art trains with support for shields.io badges and custom content. Create animated armored trains with shields.io badges for use in your projects.</p>
          
          <h4>Installation</h4>
          <div className="code-block">
            <pre><code>npm install zaamurets</code></pre>
          </div>

          <h4>Quick Start</h4>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'
import Marquee from 'react-fast-marquee'

// With scrolling animation
function Example() {
  return (
    <Marquee speed={20}>
      <Train>
        <TrainCar>
          <img src="https://img.shields.io/badge/build-passing-brightgreen" />
        </TrainCar>
      </Train>
    </Marquee>
  )
}

// With track animation
function AnotherExample() {
  return (
    <Train animated={true}>
      <TrainCar>
        <img src="https://img.shields.io/badge/build-passing-brightgreen" />
      </TrainCar>
    </Train>
  )
}`}</code></pre>
          </div>
        </>
      )
    },
    'components': {
      title: 'Components',
      content: (
        <>
          <h4>Train Component</h4>
          <p>Main container component for creating an ASCII train. Supports multiple cars in sequence to create longer trains.</p>
          
          <h5>Props</h5>
          <table className="props-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>undefined</td>
                <td>One or more TrainCar components to be rendered in sequence</td>
              </tr>
              <tr>
                <td>additionalTrackSegments</td>
                <td>number</td>
                <td>0</td>
                <td>Add extra track segments after the train</td>
              </tr>
              <tr>
                <td>animated</td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable track pattern animation (alternates between -+- and +-+ patterns)</td>
              </tr>
            </tbody>
          </table>

          <h4>TrainCar Component</h4>
          <p>Individual car components that make up the train. Multiple cars can be chained together to create longer trains, each with its own content and configuration.</p>
          
          <h5>Props</h5>
          <table className="props-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>children</td>
                <td>ReactNode | BadgeConfig[]</td>
                <td>undefined</td>
                <td>Content to display in the car (supports badges, text, or custom content)</td>
              </tr>
              <tr>
                <td>href</td>
                <td>string</td>
                <td>undefined</td>
                <td>Makes the entire car clickable with this URL</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    },
    'types': {
      title: 'Types',
      content: (
        <>
          <div className="code-block">
            <pre><code>{`interface BadgeConfig {
  src: string;      // URL of the badge image
  href?: string;    // Optional click URL for the badge
  alt?: string;     // Optional alt text for the badge
}`}</code></pre>
          </div>
        </>
      )
    },
    'examples': {
      title: 'Usage Examples',
      content: (
        <>
          <h4>Basic Badge Display</h4>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'

function BasicExample() {
  return (
    <Train>
      <TrainCar>
        <img src="https://img.shields.io/badge/build-passing-brightgreen" />
      </TrainCar>
    </Train>
  )
}`}</code></pre>
          </div>

          <h4>Multiple Cars Train</h4>
          <p>Create longer trains by adding multiple TrainCar components. Each car can have its own content and configuration.</p>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'
import Marquee from 'react-fast-marquee'

function MultiCarExample() {
  return (
    <Marquee speed={40} gradient={false}>
      <Train animated={true}>
        <TrainCar>
          <span>🚂</span>
          <span>Engine</span>
        </TrainCar>
        <TrainCar href="https://github.com/yourusername/yourrepo">
          <img src="https://img.shields.io/github/stars/yourusername/yourrepo" />
        </TrainCar>
        <TrainCar>
          <img src="https://img.shields.io/badge/tests-passing-green" />
        </TrainCar>
        <TrainCar>
          <span>🚨</span>
          <span>Caboose</span>
        </TrainCar>
      </Train>
    </Marquee>
  )
}`}</code></pre>
          </div>

          <h4>Multiple Badges in One Car</h4>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'

function MultiBadgeExample() {
  const badges = [
    {
      src: "https://img.shields.io/badge/tests-passing-green",
      href: "https://example.com/tests",
      alt: "Tests Status"
    },
    {
      src: "https://img.shields.io/badge/coverage-98%25-brightgreen",
      href: "https://example.com/coverage",
      alt: "Coverage Status"
    }
  ]

  return (
    <Train>
      <TrainCar>{badges}</TrainCar>
    </Train>
  )
}`}</code></pre>
          </div>

          <h4>Animated Track Example</h4>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'

function AnimatedTrackExample() {
  return (
    <Train animated={true} additionalTrackSegments={10}>
      <TrainCar>
        <img src="https://img.shields.io/badge/status-running-blue" />
      </TrainCar>
    </Train>
  )
}`}</code></pre>
          </div>

          <h4>Clickable Car with Custom Content</h4>
          <div className="code-block">
            <pre><code>{`import { Train, TrainCar } from 'zaamurets'

function ClickableExample() {
  return (
    <Train>
      <TrainCar href="https://github.com/yourusername/yourrepo">
        <div className="flex items-center gap-2">
          <span>Star on GitHub</span>
        </div>
      </TrainCar>
    </Train>
  )
}`}</code></pre>
          </div>
        </>
      )
    },
    'guidelines': {
      title: 'Guidelines',
      content: (
        <>
          <h4>Badge Limitations</h4>
          <p>Each train car is limited to a maximum of 2 badges to ensure proper display and readability.</p>

          <h4>Performance Considerations</h4>
          <ul>
            <li>The <code>animated</code> prop creates an interval timer to animate the track pattern. Use it sparingly in performance-critical applications</li>
            <li>Consider the total number of cars when implementing in production</li>
            <li>Ensure custom content is sized appropriately for car dimensions</li>
          </ul>

          <h4>Browser Support</h4>
          <ul>
            <li>Modern evergreen browsers (Chrome, Firefox, Safari, Edge)</li>
            <li>Internet Explorer is not supported</li>
          </ul>
        </>
      )
    }
  };

  return (
    <section id="docs" className="documentation">
      <div className="section-content">
        <h2>Documentation</h2>
        <div className="docs-grid">
          <div className="docs-nav">
            {Object.entries(sections).map(([key, section]) => (
              <div
                key={key}
                className={`docs-nav-item ${activeSection === key ? 'active' : ''}`}
                onClick={() => setActiveSection(key as SectionKey)}
              >
                {section.title}
              </div>
            ))}
          </div>
          <div className="docs-content">
            <h3>{sections[activeSection].title}</h3>
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation; 