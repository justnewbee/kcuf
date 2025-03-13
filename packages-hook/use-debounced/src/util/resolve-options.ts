import {
  IDebouncedOptions
} from '../types';

const DEFAULT_OPTIONS: Required<IDebouncedOptions> = {
  delay: 300,
  delayMax: 0,
  immediate: false
};

export default function resolveOptions(options?: number | IDebouncedOptions): Required<IDebouncedOptions> {
  return typeof options === 'number' ? {
    ...DEFAULT_OPTIONS,
    delay: options
  } : {
    ...DEFAULT_OPTIONS,
    ...options
  };
}
