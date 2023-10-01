/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [value]);

  return debounceValue;
}

export default useDebounce;
