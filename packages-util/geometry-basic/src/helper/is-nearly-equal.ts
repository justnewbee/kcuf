const TOLERANCE = 1e-7; // Number.EPSILON 太小了

export default function isNearlyEqual(n1: number, n2: number, t = TOLERANCE): boolean {
  return isNaN(n1) || isNaN(n2) ? false : Math.abs(n1 - n2) < t;
}