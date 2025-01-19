import React from 'react';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ width = '100%', numCars = 0, additionalSegments = 0 }) => {
  // Base track pattern that will be repeated
  const trackPattern = '-+-';
  
  // Calculate repetitions based on train composition:
  // Engine (10) + Cars (12 each) + Caboose (8)
  const engineRepetitions = 10;
  const carRepetitions = numCars * 12;
  const cabooseRepetitions = 8;
  const extraRepetitions = additionalSegments;
  const totalRepetitions = engineRepetitions + carRepetitions + cabooseRepetitions + extraRepetitions;
  
  const pattern = trackPattern.repeat(totalRepetitions);

  return (
    <div style={{ width, overflow: 'hidden' }}>
      <pre className="font-mono m-0 text-gray-600">{pattern}</pre>
    </div>
  );
}; 