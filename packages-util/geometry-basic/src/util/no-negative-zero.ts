/**
 * 单测中的 -0 不能与 +0...
 */
export default function noNegativeZero(n: number): number {
  return n === 0 ? 0 : n;
}