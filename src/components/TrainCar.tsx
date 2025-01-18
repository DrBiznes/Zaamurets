import React from 'react';
import { TrainCarProps } from '../types';

export const TrainCar: React.FC<TrainCarProps> = ({ children, width = 200 }) => {
  return (
    <div style={{ display: 'inline-block', width }}>
      <div className="flex justify-center items-center h-12">
        {children}
      </div>
      <pre className="inline-block">
        {`__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|
|/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
 \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/`}
      </pre>
    </div>
  );
}; 