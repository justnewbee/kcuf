import a11yContrast from './a11y-contrast';
import a11yLuminance from './a11y-luminance';

const DEFAULT_ON_LIGHT = '#000';
const DEFAULT_ON_DARK = '#fff';

interface IOptions {
  whenBgLight?: string;
  whenBgDark?: string;
  strict?: boolean;
}

/**
 * Returns black or white (or optional passed colors) for best
 * contrast depending on the luminosity of the given color.
 * When passing custom return colors, strict mode ensures that the
 * return color always meets or exceeds WCAG level AA or greater. If this test
 * fails, the default return color (black or white) is returned in place of the
 * custom return color. You can optionally turn off strict mode.
 *
 * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
 */
export default function a11yReadableColor(bgc: string, {
  whenBgLight = DEFAULT_ON_LIGHT,
  whenBgDark = DEFAULT_ON_DARK,
  strict = true
}: IOptions = {}): string {
  const bgcIsLight = a11yLuminance(bgc) > 0.179;
  const readableColor = bgcIsLight ? whenBgLight : whenBgDark;
  
  if (!strict || a11yContrast(bgc, readableColor) >= 4.5) {
    return readableColor;
  }
  
  return bgcIsLight ? DEFAULT_ON_LIGHT : DEFAULT_ON_DARK;
}
