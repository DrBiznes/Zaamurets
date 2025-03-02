import React, { useState, useEffect, memo, useMemo } from 'react';

const Engine = memo(() => {
  const [steamIndex, setSteamIndex] = useState(0);

  // Steam patterns that create a continuous billowing effect
  const steamPatterns = useMemo(
    () => [
      ['o • ° ∙        ', 'o'],
      [' o • ° ∙     ∙ ', '•'],
      ['  o • ° ∙   ° ', '°'],
      ['   o • ° ∙ • ', '∙'],
      ['    o • ° o   ', ' '],
      ['     o • • ° ∙', ' '],
      ['      o ° ∙  ', ' '],
      ['       • ∙   ', ' '],
      ['o       ∙    ', 'o'],
      [' o • ° ∙     ', '•'],
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSteamIndex(prev => (prev + 1) % steamPatterns.length);
    }, 200); // Faster animation for smoother effect

    return () => clearInterval(interval);
  }, [steamPatterns.length]);

  const [topSteam, bottomSteam] = steamPatterns[steamIndex];

  return (
    <div style={{ lineHeight: 1.2 }}>
      <pre className="font-mono m-0 text-gray-600">{`    ${topSteam}
   ${bottomSteam}      _____           
 .][__n_n_|DD[  ====_____ 
>(________|__|_[_________]_
_/oo OOOOO oo\`  ooo   ooo`}</pre>
    </div>
  );
});

Engine.displayName = 'Engine';

export { Engine };
