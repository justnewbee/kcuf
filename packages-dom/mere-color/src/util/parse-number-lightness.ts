import normalizePercentage from './normalize-percentage';

export default function parseNumberLightness(value: string): number {
  return normalizePercentage(Number(value));
}
