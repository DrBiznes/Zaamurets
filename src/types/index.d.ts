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
}

interface TrainCarProps {
  children?: ReactNode | BadgeConfig[];
  width?: number;
  href?: string;  // Optional URL for making the entire car clickable (used when children is not BadgeConfig[])
}

interface TrainProps {
  children?: ReactNode;
  carWidth?: number;
  additionalTrackSegments?: number;  // Optional number of additional track segments to add
}

export { TrainCarProps, TrainProps, BadgeConfig, TrackProps }; 