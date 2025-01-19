import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Train, TrainCar } from '../src';

// Mock console.error to avoid noise in test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

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

  describe('badge limit validation', () => {
    it('allows up to 2 badges', () => {
      const { container } = render(
        <Train>
          <TrainCar>
            <img src="https://img.shields.io/badge/test1-passing-green" alt="test badge 1" />
            <img src="https://img.shields.io/badge/test2-passing-blue" alt="test badge 2" />
          </TrainCar>
        </Train>
      );
      expect(screen.getByAltText('test badge 1')).toBeInTheDocument();
      expect(screen.getByAltText('test badge 2')).toBeInTheDocument();
    });

    it('throws error when exceeding badge limit', () => {
      const { container } = render(
        <Train>
          <TrainCar>
            <>
              <img src="https://img.shields.io/badge/test1-passing-green" alt="test badge 1" />
              <img src="https://img.shields.io/badge/test2-passing-blue" alt="test badge 2" />
              <img src="https://img.shields.io/badge/test3-passing-red" alt="test badge 3" />
            </>
          </TrainCar>
        </Train>
      );
      
      // Verify error boundary rendered error message
      const errorMessage = container.querySelector('.text-red-500');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Maximum of 2 badges allowed per train car');
    });
  });

  it('validates additionalTrackSegments prop', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(
      <Train additionalTrackSegments={-1}>
        <TrainCar>Test</TrainCar>
      </Train>
    );
    
    expect(consoleWarn).toHaveBeenCalledWith('additionalTrackSegments should be a non-negative number');
    consoleWarn.mockRestore();
  });

  it('renders animated track when animated prop is true', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <Train animated={true}>
        <TrainCar>Test</TrainCar>
      </Train>
    );
    
    const initialPattern = container.querySelector('pre')?.textContent;
    jest.advanceTimersByTime(200);
    rerender(
      <Train animated={true}>
        <TrainCar>Test</TrainCar>
      </Train>
    );
    const updatedPattern = container.querySelector('pre')?.textContent;
    
    expect(initialPattern).not.toBe(updatedPattern);
    jest.useRealTimers();
  });

  it('handles clickable train cars with href prop', () => {
    render(
      <Train>
        <TrainCar href="https://example.com">
          Click me
        </TrainCar>
      </Train>
    );
    
    const link = screen.getByText('Click me').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles badge config array format', () => {
    const badges = [
      { src: 'https://img.shields.io/badge/test1-passing-green', alt: 'test1' },
      { src: 'https://img.shields.io/badge/test2-failing-red', alt: 'test2', href: 'https://example.com' }
    ];

    render(
      <Train>
        <TrainCar>
          {badges}
        </TrainCar>
      </Train>
    );

    expect(screen.getByAltText('test1')).toBeInTheDocument();
    const linkedBadge = screen.getByAltText('test2').closest('a');
    expect(linkedBadge).toHaveAttribute('href', 'https://example.com');
  });
}); 