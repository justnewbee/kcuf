import normalizeHexValue from './normalize-hex-value';

export default function numberToHex(value: number): string {
  const hex = normalizeHexValue(value).toString(16);
  
  return hex.length === 1 ? `0${hex}` : hex;
}
