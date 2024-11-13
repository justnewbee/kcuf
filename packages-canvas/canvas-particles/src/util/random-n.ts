export default function randomN(n: number, base = 0): number {
  return Math.floor(Math.random() * (n + 1 - base)) + base;
}
