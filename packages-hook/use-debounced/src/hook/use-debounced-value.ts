import {
  useState,
  useEffect
} from 'react';

import {
  IDebouncedOptions
} from '../types';

import useDebouncedCallback from './use-debounced-callback';

export default function useDebouncedValue<T>(value: T, options?: number | IDebouncedOptions): T {
  const [stateValue, setStateValue] = useState<T>(value);
  const debouncedSetStateValue = useDebouncedCallback(setStateValue, options);
  
  useEffect(() => {
    debouncedSetStateValue(value);
  }, [value, debouncedSetStateValue]);
  
  return stateValue;
}
