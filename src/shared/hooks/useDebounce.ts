import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (value: any, delay: number) => {
  // value and delay in ms (1000ms = 1s)
  // debounced values
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // clean up the timeout after value changes
      return () => {
        clearTimeout(timer);
      };
    },
    [value, delay] // re-run if value or delay changes
  );
  return debouncedValue;
};
