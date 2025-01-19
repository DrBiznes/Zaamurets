import React from 'react';
import { Engine } from './Engine';
import { TrainCar } from './TrainCar';
import { Caboose } from './Caboose';
import { Track } from './Track';
import { TrainProps, TrainCarProps } from '../types';

export const Train: React.FC<TrainProps> = ({ children, carWidth = 200 }) => {
  const trainStyle: React.CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'min-content',
    gap: 0,
    width: 'fit-content'
  };

  return (
    <div className="w-full overflow-hidden">
      <div style={trainStyle}>
        <Engine />
        {React.Children.map(children, child => 
          React.isValidElement<TrainCarProps>(child) ? React.cloneElement(child, { width: carWidth }) : null
        )}
        <Caboose />
      </div>
      <div style={{ marginTop: '-1.9em' }}>
        <Track />
      </div>
    </div>
  );
}; 