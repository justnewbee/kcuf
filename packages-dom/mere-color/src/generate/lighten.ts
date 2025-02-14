import {
  manipulateHsl,
  hslShiftLightness
} from '../util';

export default function lighten(color: string, deltaLightness = 10): string {
  return manipulateHsl(color, hsl => hslShiftLightness(hsl, deltaLightness > 0 ? deltaLightness : 0));
}
