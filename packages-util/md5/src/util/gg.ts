export default function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  const n = a + (b & d | c & ~d) + (x >>> 0) + t;
  
  return ((n << s) | (n >>> (32 - s))) + b;
}
