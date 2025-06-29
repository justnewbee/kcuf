import {
  NUMERIC_REGEX
} from '../const';

// Tests whether the given string can be encoded as a segment in numeric mode.
// A string is encodable iff each character is in the range 0 to 9.
export default function isNumeric(text: string): boolean {
  return NUMERIC_REGEX.test(text);
}
