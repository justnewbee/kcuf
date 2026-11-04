export default function scaleByPixelRatio(input: number): number {
  return Math.floor(input * (window.devicePixelRatio || 1));
}
