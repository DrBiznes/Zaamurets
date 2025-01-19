import React, { CSSProperties } from 'react';
import { TrainCarProps } from '../types';

interface ImgProps {
  src: string;
  className?: string;
  style?: CSSProperties;
}

export const TrainCar: React.FC<TrainCarProps> = ({ children, width = 200, href }) => {
  const contentAreaStyle: CSSProperties = {
    position: 'absolute',
    top: '28px',      // Aligned with the middle row
    left: '20px',     // Padding from left border
    right: '20px',    // Padding from right border
    height: '24px',   // Fixed height for content area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const asciiCar = 
`   ______________________________
  ||                            |
   |                            |
  _|____________________________|
  'o!o!o                    o!o!o'`;

  const isShieldsBadge = (element: React.ReactElement<ImgProps>): boolean => {
    return element.type === 'img' && 
           typeof element.props.src === 'string' && 
           element.props.src.includes('shields.io');
  };

  const renderContent = () => {
    if (React.isValidElement<ImgProps>(children) && isShieldsBadge(children)) {
      // Shields.io badge handling
      return React.cloneElement(children, {
        className: 'max-h-6 w-auto',
        style: { imageRendering: 'crisp-edges' } as CSSProperties
      });
    }
    // Generic content wrapper
    return (
      <div className="max-w-full max-h-full overflow-hidden">
        {children}
      </div>
    );
  };

  const content = renderContent();

  return (
    <div style={{ width, position: 'relative', lineHeight: 1.2 }}>
      {/* ASCII Art Background */}
      <pre className="font-mono m-0 text-gray-600">
        {asciiCar}
      </pre>
      
      {/* Content Area */}
      <div style={contentAreaStyle}>
        {href ? (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            {content}
          </a>
        ) : content}
      </div>
    </div>
  );
}; 