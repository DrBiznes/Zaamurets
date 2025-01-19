import React, { memo } from 'react';

const Caboose = memo(
  (): React.ReactElement => (
    <div style={{ lineHeight: 1.2 }}>
      <pre className="font-mono m-0 text-gray-600">{` _____=======_||____
 |     _____       |
 |    |_____|      |
_|_________________|
'o!o!o        o!o!o'`}</pre>
    </div>
  )
);

Caboose.displayName = 'Caboose';

export { Caboose };
