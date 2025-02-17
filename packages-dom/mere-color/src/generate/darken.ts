import {
  manipulateHsl,
  hslShiftLightness
} from '../util';

export default function darken(color: string, delta = 10): string {
  return manipulateHsl(color, hsl => hslShiftLightness(hsl, delta > 0 ? -delta : 0));
}
