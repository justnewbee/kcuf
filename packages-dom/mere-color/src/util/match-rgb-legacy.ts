import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

/**
 * Legacy functional format
 *
 * - rgb(255, 0, 0)
 * - rgb(100%, 0, 0) 💥 No mixing
 * - rgba(255, 0, 0, 0.2)
 * - rgba(255, 0, 0, 20%)
 */
const REG_RGB_MATCHER_LEGACY = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export default function matchRgbLegacy(input: string): TupleOf<string, 8> | null {
  const arr = REG_RGB_MATCHER_LEGACY.exec(input.trim()) as TupleOf<string, 9> | null;
  
  if (!arr) {
    return null;
  }
  
  const [, ...rest] = arr;
  
  return rest;
}
