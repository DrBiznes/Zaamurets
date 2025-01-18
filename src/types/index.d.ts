import { ReactNode } from 'react';

interface TrainCarProps {
  children?: ReactNode;
  width?: number;
}

interface TrainProps {
  children?: ReactNode;
  carWidth?: number;
}

export { TrainCarProps, TrainProps }; 