import normalizePercentage from './normalize-percentage';

export default function parseNumberSaturation(value: string): number {
  return normalizePercentage(Number(value));
}
