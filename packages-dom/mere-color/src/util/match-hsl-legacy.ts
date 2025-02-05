import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

/**
 * Legacy functional format
 *
 * - hsl(255, 0, 0)
 * - hsl(100%, 0, 0) 💥
 * - hsla(255, 0, 0, 0.2)
 * - hsla(255, 0%, 0%, 20%)
 */
export const REG_HSL_MATCHER_LEGACY = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export default function matchHslLegacy(input: string): TupleOf<string, 6> | null {
  const arr = REG_HSL_MATCHER_LEGACY.exec(input.trim()) as TupleOf<string, 7> | null;
  
  if (!arr) {
    return null;
  }
  
  const [, ...rest] = arr;
  
  return rest;
}
