import React from 'react';
import { render } from '@testing-library/react';
import { Train, TrainCar } from '../src';

describe('Train', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Train>
        <TrainCar>Test Content</TrainCar>
      </Train>
    );
    expect(container).toBeInTheDocument();
  });
}); 