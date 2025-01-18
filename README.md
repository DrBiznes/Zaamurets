# ASCII Train React

A React component library for creating ASCII art trains with support for shields.io badges and custom content.

## Installation

\`\`\`bash
npm install ascii-train-react
# or
yarn add ascii-train-react
\`\`\`

## Usage

\`\`\`jsx
import { Train, TrainCar } from 'ascii-train-react';
import Marquee from 'react-fast-marquee';

function App() {
  return (
    <Marquee speed={20} gradient={false}>
      <Train carWidth={240}>
        <TrainCar>
          <img src="https://img.shields.io/badge/build-passing-brightgreen" />
        </TrainCar>
        <TrainCar>
          <div className="flex items-center gap-1">
            <img src="https://img.shields.io/badge/tests-pass-blue" />
            <img src="https://img.shields.io/badge/coverage-100%25-green" />
          </div>
        </TrainCar>
      </Train>
    </Marquee>
  );
}
\`\`\`

## License

MIT