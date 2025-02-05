import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

/**
 * Modern format
 *
 * - rgb(255 0 0)
 * - rgb(100% 20 128)
 * - rgb(100% 0 0 / 0.2)
 * - rgb(100% 0 0 / 20%)
 * - rgba(255 0 0 / 0.2)
 * - rgba(100% 0 0 / 0.2)
 * - rgba(255 0 0 / 20%)
 * - rgba(100% 0 0 / 20%)
 */
const REG_RGB_MATCHER_MODERN = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export default function matchRgb(input: string): TupleOf<string, 8> | null {
  const arr = REG_RGB_MATCHER_MODERN.exec(input.trim()) as TupleOf<string, 9> | null;
  
  if (!arr) {
    return null;
  }
  
  const [, ...rest] = arr;
  
  return rest;
}
