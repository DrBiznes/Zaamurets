import React, { useState, useEffect } from 'react';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ 
  width = '100%', 
  numCars = 0, 
  additionalSegments = 0,
  animated = false 
}) => {
  const [trackIndex, setTrackIndex] = useState(0);
  
  // Track patterns that create a moving effect by alternating characters
  const trackPatterns = [
    '-+-',  // Pattern 1
    '+-+',  // Pattern 2
    '-+-',  // Pattern 3
    '+-+'   // Pattern 4
  ];
  
  // Calculate repetitions based on train composition:
  // Engine (10) + Cars (12 each) + Caboose (8)
  const engineRepetitions = 10;
  const carRepetitions = numCars * 12;
  const cabooseRepetitions = 8;
  const extraRepetitions = additionalSegments;
  const totalRepetitions = engineRepetitions + carRepetitions + cabooseRepetitions + extraRepetitions;

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setTrackIndex((prev) => (prev + 1) % trackPatterns.length);
    }, 200); // Match Engine animation speed

    return () => clearInterval(interval);
  }, [animated]);

  const pattern = animated 
    ? trackPatterns[trackIndex].repeat(totalRepetitions)
    : trackPatterns[0].repeat(totalRepetitions);

  return (
    <div style={{ width, overflow: 'hidden' }}>
      <pre className="font-mono m-0 text-gray-600">{pattern}</pre>
    </div>
  );
}; 