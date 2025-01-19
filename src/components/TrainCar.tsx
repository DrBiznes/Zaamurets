import React, { CSSProperties, memo, useMemo } from 'react';
import { TrainCarProps, BadgeConfig } from '../types';
import { ErrorBoundary } from './ErrorBoundary';

interface ImgProps {
  src: string;
  className?: string;
  style?: CSSProperties;
}

const MAX_BADGES = 2;

class TooManyBadgesError extends Error {
  constructor() {
    super(`Maximum of ${MAX_BADGES} badges allowed per train car`);
    this.name = 'TooManyBadgesError';
  }
}

export const TrainCar = memo(({ children, href }: TrainCarProps): React.ReactElement => {
  const contentAreaStyle: CSSProperties = {
    position: 'absolute',
    top: '28px',      // Aligned with the middle row
    left: '20px',     // Padding from left border
    right: '20px',    // Padding from right border
    height: '24px',   // Fixed height for content area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',       // Add spacing between multiple badges
    marginRight: '-1.5ch' // Offset the extra space in ASCII art
  };

  const asciiCar = 
`   ______________________________
  ||                            |
   |                            |
  _|____________________________|_
  'o!o!o                    o!o!o'`;

  const isShieldsBadge = (element: React.ReactElement<ImgProps>): boolean => {
    return element.type === 'img' && 
           typeof element.props.src === 'string' && 
           element.props.src.includes('shields.io');
  };

  const isBadgeConfigArray = (children: any): children is BadgeConfig[] => {
    return Array.isArray(children) && children.every(child => 'src' in child);
  };

  const validateBadges = (badges: BadgeConfig[] | React.ReactElement<ImgProps>) => {
    if (isBadgeConfigArray(badges)) {
      if (badges.length > MAX_BADGES) {
        throw new TooManyBadgesError();
      }
    } else if (React.Children.count(badges) > MAX_BADGES) {
      throw new TooManyBadgesError();
    }
  };

  const renderBadges = useMemo(() => (badges: BadgeConfig[]) => {
    validateBadges(badges);
    return badges.map((badge, index) => {
      if (!badge.src) {
        console.warn('Badge source is required');
        return null;
      }

      const img = (
        <img
          key={index}
          src={badge.src}
          alt={badge.alt || ''}
          className="max-h-6 w-auto"
          style={{ imageRendering: 'crisp-edges' }}
        />
      );

      return badge.href ? (
        <a
          key={index}
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          {img}
        </a>
      ) : img;
    });
  }, []);

  const renderContent = () => {
    if (isBadgeConfigArray(children)) {
      return renderBadges(children);
    }

    if (React.isValidElement<ImgProps>(children) && isShieldsBadge(children)) {
      validateBadges(children);
      return React.cloneElement(children, {
        className: 'max-h-6 w-auto',
        style: { imageRendering: 'crisp-edges' } as CSSProperties
      });
    }

    return (
      <div className="max-w-full max-h-full overflow-hidden">
        {children}
      </div>
    );
  };

  const content = renderContent();

  return (
    <ErrorBoundary>
      <div style={{ width: 240, position: 'relative', lineHeight: 1.2 }}>
        {/* ASCII Art Background */}
        <pre className="font-mono m-0 text-gray-600">
          {asciiCar}
        </pre>
        
        {/* Content Area */}
        <div style={contentAreaStyle}>
          {!isBadgeConfigArray(children) && href ? (
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
    </ErrorBoundary>
  );
}); 