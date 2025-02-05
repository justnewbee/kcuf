import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

/**
 * Modern format
 *
 * - hsl(255 10 20)
 * - hsl(100% 10% 20)
 * - hsl(100% 10% 20% / 0.2)
 * - hsl(100% 10% 20% / 20%)
 * - hsla(255 0 0 / 0.2)
 * - hsla(100% 0 0 / 0.2)
 * - hsla(255 0 0 / 20%)
 * - hsla(100% 0 0 / 20%)
 */
const REG_HSL_MATCHER_MODERN = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%?\s+([+-]?\d*\.?\d+)%?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export default function matchHsl(input: string): TupleOf<string, 6> | null {
  const arr = REG_HSL_MATCHER_MODERN.exec(input.trim()) as TupleOf<string, 7> | null;
  
  if (!arr) {
    return null;
  }
  
  const [, ...rest] = arr;
  
  return rest;
}
