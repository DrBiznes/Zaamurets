import React from 'react';
import { Engine } from './Engine';
import { TrainCar } from './TrainCar';
import { Caboose } from './Caboose';
import { Track } from './Track';
import { TrainProps, TrainCarProps } from '../types';

export const Train: React.FC<TrainProps> = ({ 
  children, 
  additionalTrackSegments = 0,
  animated = false 
}) => {
  const trainStyle: React.CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'min-content',
    gap: 0,
    width: 'fit-content'
  };

  // Calculate number of train cars
  const numCars = React.Children.count(children);

  return (
    <div className="w-full overflow-hidden">
      <div style={trainStyle}>
        <div style={{ marginRight: '-1ch' }}>
          <Engine />
        </div>
        {React.Children.map(children, (child, index) => 
          React.isValidElement<TrainCarProps>(child) ? (
            <div style={{ marginLeft: index > 0 ? '-0.8ch' : 0 }}>
              {React.cloneElement(child)}
            </div>
          ) : null
        )}
        <div style={{ marginLeft: '0.8ch' }}>
          <Caboose />
        </div>
      </div>
      <div style={{ marginTop: '-1.9em', width: '100%', position: 'relative' }}>
        <Track 
          width="100%" 
          numCars={numCars} 
          additionalSegments={additionalTrackSegments}
          animated={animated}
        />
      </div>
    </div>
  );
}; 