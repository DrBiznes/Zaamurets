import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface Section {
  title: string;
  content: JSX.Element;
}

type SectionKey = 'getting-started' | 'components' | 'types' | 'examples' | 'guidelines';

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = "tsx" }) => (
  <div className="code-block">
    <Highlight
      theme={themes.vsDark}
      code={code.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, background: '#000000' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('getting-started');

  const sections: Record<SectionKey, Section> = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <>
          <p>Zaamurets is a React component library for creating ASCII art trains with support for <a href="https://shields.io" target="_blank" rel="noopener noreferrer">shields.io</a> badges and custom content. Create animated armored trains with shields.io badges for use in your projects.</p>
          
          <h4>Dependencies</h4>
          <p>While Zaamurets itself has no dependencies, it works great with:</p>
          <ul>
            <li><a href="https://www.npmjs.com/package/react-fast-marquee" target="_blank" rel="noopener noreferrer">react-fast-marquee</a> - For smooth scrolling animations</li>
            <li><a href="https://shields.io" target="_blank" rel="noopener noreferrer">shields.io</a> - For beautiful, dynamic badges</li>
          </ul>

          <h4>Installation</h4>
          <CodeBlock 
            code={`# Install Zaamurets
npm install zaamurets

# Optional: Install react-fast-marquee for scrolling animations
npm install react-fast-marquee`} 
            language="bash"
          />

          <h4>Quick Start</h4>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'
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
}`} />
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
          <CodeBlock code={`interface BadgeConfig {
  src: string;      // URL of the badge image
  href?: string;    // Optional click URL for the badge
  alt?: string;     // Optional alt text for the badge
}`} />
        </>
      )
    },
    'examples': {
      title: 'Usage Examples',
      content: (
        <>
          <h4>Basic Badge Display</h4>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'

function BasicExample() {
  return (
    <Train>
      <TrainCar>
        <img src="https://img.shields.io/badge/build-passing-brightgreen" />
      </TrainCar>
    </Train>
  )
}`} />

          <h4>Multiple Cars Train</h4>
          <p>Create longer trains by adding multiple TrainCar components. Each car can have its own content and configuration.</p>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'
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
}`} />

          <h4>Multiple Badges in One Car</h4>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'

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
}`} />

          <h4>Animated Track Example</h4>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'

function AnimatedTrackExample() {
  return (
    <Train animated={true} additionalTrackSegments={10}>
      <TrainCar>
        <img src="https://img.shields.io/badge/status-running-blue" />
      </TrainCar>
    </Train>
  )
}`} />

          <h4>Clickable Car with Custom Content</h4>
          <CodeBlock code={`import { Train, TrainCar } from 'zaamurets'

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
}`} />
        </>
      )
    },
    'guidelines': {
      title: 'Guidelines',
      content: (
        <>
          <h4>Using with react-fast-marquee</h4>
          <p>For scrolling animations, I recommend using react-fast-marquee. Here are some tips:</p>
          <ul>
            <li>Use <code>speed</code> prop to control animation speed (recommended: 20-50)</li>
            <li>Set <code>gradient={false}</code> to avoid fade effects on the edges</li>
            <li>Enable <code>pauseOnHover</code> for better user interaction</li>
            <li>Use <code>autoFill</code> to automatically fill empty space</li>
          </ul>

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