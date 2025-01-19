import React, { useState, useEffect } from 'react';
import { Train, TrainCar } from 'zaamurets';
import { Copy, Check } from 'lucide-react';
import './Hero.css';

interface SplitFlapCharacterProps {
  targetChar: string;
}

interface SplitFlapRowProps {
  text: string;
  totalSlots: number;
}

const SplitFlapCharacter: React.FC<SplitFlapCharacterProps> = ({ targetChar }) => {
  const [currentChar, setCurrentChar] = useState(' ');
  const chars = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!'.split('');
  
  useEffect(() => {
    let currentIndex = chars.indexOf(currentChar);
    const targetIndex = chars.indexOf(targetChar.toUpperCase());
    
    const interval = setInterval(() => {
      if (currentIndex !== targetIndex) {
        currentIndex = (currentIndex + 1) % chars.length;
        setCurrentChar(chars[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [targetChar]);

  return (
    <div className="hero-split-flap-char">
      <div className="hero-split-flap-inner">
        <div className="hero-split-flap-text">
          {currentChar}
        </div>
      </div>
      <div className="hero-split-flap-line" />
      <div className="hero-split-flap-gradient" />
    </div>
  );
};

const SplitFlapRow: React.FC<SplitFlapRowProps> = ({ text, totalSlots }) => {
  const displayText = Array(totalSlots).fill(' ');
  const startPos = Math.floor((totalSlots - text.length) / 2);
  
  text.split('').forEach((char, idx) => {
    if (idx + startPos < totalSlots) {
      displayText[idx + startPos] = char;
    }
  });
  
  return (
    <div className="hero-split-flap-row">
      {displayText.map((char, index) => (
        <SplitFlapCharacter key={index} targetChar={char} />
      ))}
    </div>
  );
};

const SplitFlapDisplay: React.FC = () => {
  const lines = [
    "ZAAMURETS",
    "CREATE BADASS ASCII",
    "TRAINS THAT CARRY",
    "YOUR SHIELD.IO BADGES"
  ];
  
  const slotsNeeded = Math.max(...lines.map(line => line.length));
  const totalSlots = slotsNeeded + 2;
  
  return (
    <div className="hero-split-flap-display">
      <div className="hero-split-flap-content">
        {lines.map((line, index) => (
          <SplitFlapRow key={index} text={line} totalSlots={totalSlots} />
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install zaamurets');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <SplitFlapDisplay />
        
        <div className="hero-actions-group">
          <div className="hero-install-command">
            <code>npm install zaamurets</code>
            <button onClick={handleCopy} className="hero-copy-button">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="hero-actions">
            <a href="#gif-generator" className="hero-action-button primary">Create Your Train</a>
            <a href="#docs" className="hero-action-button secondary">View Documentation</a>
          </div>
        </div>
      </div>

      <div className="train-preview-section">
        <div className="train-container">
          <Train animated={true} speed={1}>
            <TrainCar>
              <a href="https://www.npmjs.com/package/zaamurets">
                <img src="https://img.shields.io/npm/v/zaamurets?style=flat-square&logo=npm" alt="npm version" />
              </a>
            </TrainCar>
          </Train>
        </div>
      </div>
    </section>
  );
};

export default Hero; 