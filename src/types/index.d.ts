import { ReactNode } from 'react';

interface BadgeConfig {
  src: string;
  href?: string;
  alt?: string;
}

interface TrackProps {
  width?: number | string;
  numCars?: number;
  additionalSegments?: number;  // Number of additional track segments to add
  animated?: boolean;  // Controls track animation using ASCII character alternation
}

interface TrainCarProps {
  children?: ReactNode | BadgeConfig[];
  href?: string;  // Optional URL for making the entire car clickable (used when children is not BadgeConfig[])
}

interface TrainProps {
  children?: ReactNode;
  additionalTrackSegments?: number;  // Optional number of additional track segments to add
  animated?: boolean;  // Whether the track animation should be enabled
}

export { TrainCarProps, TrainProps, BadgeConfig, TrackProps }; 