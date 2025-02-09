import _round from 'lodash/round';

/**
 * Compute contrast according to two luminance values.
 */
export default function computeContrast(fgcLuminance: number, bgcLuminance: number): number {
  if (fgcLuminance < 0 || bgcLuminance < 0) {
    return -1;
  }
  
  return _round(fgcLuminance > bgcLuminance ? (fgcLuminance + 0.05) / (bgcLuminance + 0.05) : (bgcLuminance + 0.05) / (fgcLuminance + 0.05), 3);
}
