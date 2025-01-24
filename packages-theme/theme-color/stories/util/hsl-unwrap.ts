import toHslColorString from './to-hsl-color-string';

export default function hslUnwrap(color: string): string {
  return (/^hsl\(/.test(color) ? color : toHslColorString(color)).replace('hsl(', '').replace(')', '');
}
