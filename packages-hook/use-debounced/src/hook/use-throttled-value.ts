import useDebouncedValue from './use-debounced-value';

export default function useThrottledValue<T>(value: T, delay = 400): T {
  return useDebouncedValue<T>(value, {
    delay,
    delayMax: delay,
    immediate: true
  });
}
