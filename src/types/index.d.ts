import { ReactNode } from 'react';

interface TrainCarProps {
  children?: ReactNode;
  width?: number;
  href?: string;  // Optional URL for making the content clickable
}

interface TrainProps {
  children?: ReactNode;
  carWidth?: number;
}

export { TrainCarProps, TrainProps }; 