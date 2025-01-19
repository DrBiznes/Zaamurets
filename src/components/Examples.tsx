import React, { useState } from 'react';
import { Train, TrainCar } from 'zaamurets';
import Marquee from 'react-fast-marquee';
import { Code, Eye } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

const Examples: React.FC = () => {
  const [showCode, setShowCode] = useState<Record<number, boolean>>({});

  const toggleView = (index: number) => {
    setShowCode(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const examples = [
    {
      title: "Basic Train",
      description: "A simple animated train with a single car.",
      code: `<Train animated={true}>
  <TrainCar>
    <span>Simple</span>
  </TrainCar>
</Train>`,
      component: (
        <Train animated={true}>
          <TrainCar>
            <span>Simple</span>
          </TrainCar>
        </Train>
      )
    },
    {
      title: "Shields.io Badge",
      description: "A train carrying a clickable GitHub shield badge.",
      code: `<Train animated={true}>
  <TrainCar>
    <a href="https://github.com/DrBiznes/zaamurets">
      <img src="https://img.shields.io/github/stars/DrBiznes/zaamurets?style=flat-square&logo=github" alt="GitHub stars" />
    </a>
  </TrainCar>
</Train>`,
      component: (
        <Train animated={true}>
          <TrainCar>
            <a href="https://github.com/DrBiznes/zaamurets">
              <img src="https://img.shields.io/github/stars/DrBiznes/zaamurets?style=flat-square&logo=github" alt="GitHub stars" />
            </a>
          </TrainCar>
        </Train>
      )
    },
    {
      title: "Marquee Train",
      description: "A train that moves across the screen using react-fast-marquee.",
      code: `<Marquee speed={50} gradient={false} pauseOnHover={true} autoFill={true}>
  <Train animated={true}>
    <TrainCar>
      <span>Marquee Example</span>
    </TrainCar>
  </Train>
</Marquee>`,
      component: (
        <Marquee speed={50} gradient={false} pauseOnHover={true} autoFill={true}>
          <Train animated={true}>
            <TrainCar>
              <span>Marquee Example</span>
            </TrainCar>
          </Train>
        </Marquee>
      )
    },
    {
      title: "Multi-Car Train",
      description: "A train with multiple cars moving in a marquee animation.",
      code: `<Marquee speed={40} gradient={false} pauseOnHover={true}>
  <Train animated={true} additionalTrackSegments={10}>
    <TrainCar>
      <span>🚂</span>
      <span>First Car</span>
    </TrainCar>
    <TrainCar>
      <span>📦</span>
      <span>Cargo</span>
    </TrainCar>
    <TrainCar>
      <span>🎁</span>
      <span>More Cargo</span>
    </TrainCar>
  </Train>
</Marquee>`,
      component: (
        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          <Train animated={true} additionalTrackSegments={10}>
            <TrainCar>
              <span>🚂</span>
              <span>First Car</span>
            </TrainCar>
            <TrainCar>
              <span>📦</span>
              <span>Cargo</span>
            </TrainCar>
            <TrainCar>
              <span>🎁</span>
              <span>More Cargo</span>
            </TrainCar>
          </Train>
        </Marquee>
      )
    }
  ];

  return (
    <section id="examples" className="examples">
      <div className="section-content">
        <h2>Examples</h2>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <div key={index} className="example-card">
              <div className="example-header">
                <h3>{example.title}</h3>
                <button 
                  onClick={() => toggleView(index)} 
                  className="toggle-button"
                >
                  {showCode[index] ? (
                    <>
                      <Eye size={16} />
                      <span>Show Preview</span>
                    </>
                  ) : (
                    <>
                      <Code size={16} />
                      <span>Show Code</span>
                    </>
                  )}
                </button>
              </div>
              <div className={showCode[index] ? 'example-code' : 'example-preview'}>
                {showCode[index] ? (
                  <Highlight
                    theme={themes.vsDark}
                    code={example.code.trim()}
                    language="tsx"
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
                ) : (
                  example.component
                )}
              </div>
              <p>{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples; 