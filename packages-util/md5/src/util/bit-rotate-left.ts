/**
 * Bit-wise rotation left
 */
export default function bitRotateLeft(n: number, b: number): number {
  return (n << b) | (n >>> (32 - b));
}
