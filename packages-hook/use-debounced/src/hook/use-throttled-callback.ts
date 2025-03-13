import {
  TBaseCallback
} from '../types';

import useDebouncedCallback from './use-debounced-callback';

export default function useThrottledCallback<F extends TBaseCallback>(fn: F, delay = 400): F {
  return useDebouncedCallback<F>(fn, {
    delay,
    delayMax: delay,
    immediate: true
  });
}
