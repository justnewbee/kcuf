import {
  toStringHex
} from '../to-string';

export default function isEqual(color1: string, color2: string): boolean {
  return toStringHex(color1) === toStringHex(color2);
}
