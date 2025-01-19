import React, { useState, useEffect, memo, useMemo } from 'react';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = memo(({ 
  width = '100%', 
  numCars = 0, 
  additionalSegments = 0,
  animated = false 
}) => {
  const [trackIndex, setTrackIndex] = useState(0);
  
  // Track patterns that create a moving effect by alternating characters
  const trackPatterns = useMemo(() => [
    '-+-',  // Pattern 1
    '+-+',  // Pattern 2
    '-+-',  // Pattern 3
    '+-+'   // Pattern 4
  ], []);
  
  // Calculate repetitions based on train composition
  const totalRepetitions = useMemo(() => {
    const engineRepetitions = 10;
    const carRepetitions = Math.max(0, numCars) * 12;
    const cabooseRepetitions = 8;
    const extraRepetitions = Math.max(0, additionalSegments);
    return engineRepetitions + carRepetitions + cabooseRepetitions + extraRepetitions;
  }, [numCars, additionalSegments]);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setTrackIndex((prev) => (prev + 1) % trackPatterns.length);
    }, 200); // Match Engine animation speed

    return () => clearInterval(interval);
  }, [animated, trackPatterns.length]);

  const pattern = useMemo(() => 
    animated 
      ? trackPatterns[trackIndex].repeat(totalRepetitions)
      : trackPatterns[0].repeat(totalRepetitions),
    [animated, trackIndex, trackPatterns, totalRepetitions]
  );

  return (
    <div style={{ width, overflow: 'hidden' }}>
      <pre className="font-mono m-0 text-gray-600">{pattern}</pre>
    </div>
  );
}); 