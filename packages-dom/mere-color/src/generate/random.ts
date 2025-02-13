import {
  toColorString
} from '../util';
import {
  EColorNotation
} from '../enum';

export default function random(format: `${EColorNotation}` = EColorNotation.HEX): string {
  return toColorString({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
  }, format);
}
