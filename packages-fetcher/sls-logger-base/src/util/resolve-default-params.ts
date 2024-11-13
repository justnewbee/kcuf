import {
  TDefaultParams
} from '../types';

export default function resolveDefaultParams(defaultParams?: TDefaultParams): Record<string, unknown> | undefined {
  return typeof defaultParams === 'function' ? defaultParams() : defaultParams;
}
