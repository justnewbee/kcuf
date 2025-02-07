/**
 * Parse number value alpha.
 *
 * - 0.xy → xy
 * - xy% → xy
 */
export default function parseNumberAlpha(value?: string, unit?: string): number | undefined {
  return !value ? undefined : Number(value) * (unit === '%' ? 1 : 100);
}
