export default function clamp(n = 0, min = 0, max = Infinity): number {
  return Math.min(Math.max(n, min), max);
}
