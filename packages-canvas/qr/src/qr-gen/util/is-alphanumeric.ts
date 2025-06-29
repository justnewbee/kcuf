import {
  ALPHANUMERIC_REGEX
} from '../const';

// Tests whether the given string can be encoded as a segment in alphanumeric mode.
// A string is encodable iff each character is in the following set: 0 to 9, A to Z
// (uppercase only), space, dollar, percent, asterisk, plus, hyphen, period, slash, colon.
export default function isAlphanumeric(text: string): boolean {
  return ALPHANUMERIC_REGEX.test(text);
}
