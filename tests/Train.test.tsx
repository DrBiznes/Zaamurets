import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  it('renders multiple train cars', () => {
    render(
      <Train>
        <TrainCar>Car 1</TrainCar>
        <TrainCar>Car 2</TrainCar>
        <TrainCar>Car 3</TrainCar>
      </Train>
    );
    expect(screen.getByText('Car 1')).toBeInTheDocument();
    expect(screen.getByText('Car 2')).toBeInTheDocument();
    expect(screen.getByText('Car 3')).toBeInTheDocument();
  });

  it('renders train cars with fixed width of 240px', () => {
    const { container } = render(
      <Train>
        <TrainCar>Car Content</TrainCar>
      </Train>
    );
    const trainCarDiv = container.querySelector('div[style*="width: 240px"]');
    expect(trainCarDiv).toBeInTheDocument();
  });

  it('renders with shields.io badges', () => {
    render(
      <Train>
        <TrainCar>
          <img src="https://img.shields.io/badge/test-passing-green" alt="test badge" />
        </TrainCar>
      </Train>
    );
    const badge = screen.getByAltText('test badge');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('IMG');
  });
}); 