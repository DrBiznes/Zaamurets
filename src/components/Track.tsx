import React from 'react';

interface TrackProps {
  width?: number;
}

export const Track: React.FC<TrackProps> = ({ width = '100%' }) => (
  <div style={{ width }}>
    <pre className="font-mono m-0 text-gray-600">-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-</pre>
  </div>
); 