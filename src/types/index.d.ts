import { ReactNode } from 'react';

interface BadgeConfig {
  src: string;
  href?: string;
  alt?: string;
}

interface TrainCarProps {
  children?: ReactNode | BadgeConfig[];
  width?: number;
  href?: string;  // Optional URL for making the entire car clickable (used when children is not BadgeConfig[])
}

interface TrainProps {
  children?: ReactNode;
  carWidth?: number;
}

export { TrainCarProps, TrainProps, BadgeConfig }; 