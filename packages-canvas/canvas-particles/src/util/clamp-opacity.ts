import clamp from './clamp';

export default function clampOpacity(value: number): number {
  return clamp(value, 1, 100);
}
