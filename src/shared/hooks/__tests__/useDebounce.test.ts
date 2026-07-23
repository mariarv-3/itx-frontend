import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value change', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 300 });

    // Value should not be updated immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 150ms (before delay)
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial');

    // Fast-forward time by remaining 150ms (reaching delay)
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('updated');
  });

  it('should reset the timer if value changes before the delay completes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    // Update the value
    rerender({ value: 'updated1', delay: 300 });

    // Fast-forward 150ms
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial');

    // Update the value AGAIN before the first timer finishes
    rerender({ value: 'updated2', delay: 300 });

    // Fast-forward 150ms (would have finished the first timer)
    act(() => {
      jest.advanceTimersByTime(150);
    });
    // Still initial because the timer was reset
    expect(result.current).toBe('initial');

    // Fast-forward another 150ms (finishes the second timer)
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('updated2');
  });
});
