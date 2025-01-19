import React, { memo, useMemo } from 'react';
import { Engine } from './Engine';
import { TrainCar } from './TrainCar';
import { Caboose } from './Caboose';
import { Track } from './Track';
import { TrainProps, TrainCarProps } from '../types';
import { ErrorBoundary } from './ErrorBoundary';

export const Train = memo(({ 
  children, 
  additionalTrackSegments = 0,
  animated = false 
}: TrainProps): React.ReactElement => {
  const trainStyle: React.CSSProperties = useMemo(() => ({
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'min-content',
    gap: 0,
    width: 'fit-content'
  }), []);

  // Calculate number of train cars
  const numCars = React.Children.count(children);

  // Validate additionalTrackSegments
  if (additionalTrackSegments < 0) {
    console.warn('additionalTrackSegments should be a non-negative number');
  }

  const renderTrainCars = useMemo(() => (
    React.Children.map(children, (child, index) => 
      React.isValidElement<TrainCarProps>(child) ? (
        <div style={{ marginLeft: index > 0 ? '-0.8ch' : 0 }}>
          {React.cloneElement(child)}
        </div>
      ) : null
    )
  ), [children]);

  return (
    <ErrorBoundary>
      <div className="w-full overflow-hidden">
        <div style={trainStyle}>
          <div style={{ marginRight: '-1ch' }}>
            <Engine />
          </div>
          {renderTrainCars}
          <div style={{ marginLeft: '0.8ch' }}>
            <Caboose />
          </div>
        </div>
        <div style={{ marginTop: '-1.9em', width: '100%', position: 'relative' }}>
          <Track 
            width="100%" 
            numCars={numCars} 
            additionalSegments={Math.max(0, additionalTrackSegments)}
            animated={animated}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}); 