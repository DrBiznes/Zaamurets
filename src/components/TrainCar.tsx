import React from 'react';
import { TrainCarProps } from '../types';

export const TrainCar: React.FC<TrainCarProps> = ({ children, width = 200 }) => {
  const contentAreaStyle = {
    position: 'absolute',
    top: '28px',      // Aligned with the middle row
    left: '20px',     // Padding from left border
    right: '20px',    // Padding from right border
    height: '24px',   // Fixed height for content area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const asciiCar = `_____=======_||____
 |                 |
 |                 |
_|_________________|
 'o!o         o!o\`
-+-+-+-+-+-+-+-+-`;

  return (
    <div className="inline-block align-top relative" style={{ width }}>
      {/* ASCII Art Background */}
      <pre className="font-mono m-0 leading-tight text-gray-600">
        {asciiCar}
      </pre>
      
      {/* Content Area */}
      <div style={contentAreaStyle}>
        {React.isValidElement(children) && children.type === 'img' && 
         children.props.src?.includes('shields.io') ? (
          // Shields.io badge handling
          React.cloneElement(children, {
            className: 'max-h-6 w-auto',
            style: { imageRendering: 'crisp-edges' }
          })
        ) : (
          // Generic content wrapper
          <div className="max-w-full max-h-full overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}; 