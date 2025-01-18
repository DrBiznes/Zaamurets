import React from 'react';
import { Engine } from './Engine';
import { TrainCar } from './TrainCar';
import { Caboose } from './Caboose';
import { TrainProps } from '../types';

export const Train: React.FC<TrainProps> = ({ children, carWidth = 200 }) => {
  return (
    <div className="inline-block whitespace-nowrap">
      <Engine />
      {React.Children.map(children, child => (
        React.cloneElement(child as React.ReactElement, { width: carWidth })
      ))}
      <Caboose />
    </div>
  );
}; 