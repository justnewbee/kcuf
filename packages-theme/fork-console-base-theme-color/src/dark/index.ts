import {
  IColorEssential
} from '../types';
import {
  createThemeColor
} from '../util';

// const TRANSPARENT = 'transparent';
// const WHITE = 'hsl(0 0% 100%)';
// const BLACK = 'hsl(0 0% 0%)';
const INVERSE = 'hsl(0 0% 0%)';
const INVERSE_BG = 'hsl(0 0% 100%)';
// const BRAND = 'hsl(25 100% 50%)';
// const BRAND_HOVER = 'hsl(25 100% 50%)';
// const BRAND_ACTIVE = '#e50';
const ACCENT = 'hsl(207 100% 40%)';
const ACCENT_HOVER = 'hsl(207 100% 40%)';
const ACCENT_ACTIVE = 'hsl(210 100% 39%)';
// const EMPHASIS = 'hsl(25 100% 50%)';
// const DANGER = 'hsl(0 100% 39%)';
// const CODE = 'hsl(346 85% 65%)';
const GRAY_PRIMARY = 'hsl(210 3% 85%)';
const GRAY_SECONDARY = 'hsl(0 0% 80%)';
const GRAY_TERTIARY = 'hsl(0 0% 60%)';
const GRAY_DISABLED = 'hsl(0 0% 40%)';
const GRAY_PRIMARY_BD = 'hsl(0 0% 53%)';
const GRAY_SECONDARY_BD = 'hsl(240 4% 42%)';
const GRAY_TERTIARY_BD = 'hsl(240 5% 28%)';
const GRAY_DISABLED_BD = 'hsl(212 12% 21%)';
const GRAY_PRIMARY_BG = 'hsl(0 0% 23%)';
const GRAY_SECONDARY_BG = 'hsl(0 0% 15%)';
const GRAY_TERTIARY_BG = 'hsl(0 0% 12%)';
const GRAY_DISABLED_BG = 'hsl(215 21% 11%)';
const GRAY_SECONDARY_FADE_BG = 'hsl(0 0% 100% / 8%)';
const GRAY_TERTIARY_FADE_BG = 'hsl(0 0% 100% / 10%)';
const HELP = 'hsl(0 0% 47%)';
const INFO = 'hsl(207 100% 40%)'; // 稍稍提亮一些
// const SUCCESS = 'hsl(137 65% 34%)';
// const WARNING = 'hsl(41 100% 63%)';
// const ERROR = 'hsl(3 70% 50%)';
const HELP_TINT = 'hsl(0 0% 20%)';
const INFO_TINT = 'hsl(206 13% 24%)';
const SUCCESS_TINT = 'hsl(136 12% 24%)';
const WARNING_TINT = 'hsl(47 26% 27%)';
const ERROR_TINT = 'hsl(4 11% 24%)';
const HELP_TINT_FADE = 'hsl(0 0% 50% / 67%)';
// const INFO_TINT_FADE = 'hsl(206 100% 40% / 7%)';
// const SUCCESS_TINT_FADE = 'hsl(136 100% 42% / 7%)';
// const WARNING_TINT_FADE = 'hsl(47 100% 50% / 14%)';
// const ERROR_TINT_FADE = 'hsl(4 100% 41% / 7%)';
const SHADOW = 'hsl(0 0% 0% / 32%)';
const BACKDROP = 'hsl(0 0% 0% / 40%)';

const COLOR_ESSENTIAL_OVERRIDE: Partial<IColorEssential> = {
  // TRANSPARENT,
  // WHITE,
  // BLACK
  INVERSE,
  INVERSE_BG,
  // BRAND,
  // BRAND_HOVER,
  // BRAND_ACTIVE,
  ACCENT,
  ACCENT_HOVER,
  ACCENT_ACTIVE,
  // DANGER,
  // EMPHASIS,
  // CODE,
  GRAY_PRIMARY,
  GRAY_SECONDARY,
  GRAY_TERTIARY,
  GRAY_DISABLED,
  GRAY_PRIMARY_BD,
  GRAY_SECONDARY_BD,
  GRAY_TERTIARY_BD,
  GRAY_DISABLED_BD,
  GRAY_PRIMARY_BG,
  GRAY_SECONDARY_BG,
  GRAY_TERTIARY_BG,
  GRAY_DISABLED_BG,
  GRAY_SECONDARY_FADE_BG,
  GRAY_TERTIARY_FADE_BG,
  HELP,
  INFO,
  // SUCCESS,
  // WARNING,
  // ERROR,
  HELP_TINT,
  INFO_TINT,
  SUCCESS_TINT,
  WARNING_TINT,
  ERROR_TINT,
  HELP_TINT_FADE,
  // INFO_TINT_FADE,
  // SUCCESS_TINT_FADE,
  // WARNING_TINT_FADE,
  // ERROR_TINT_FADE,
  SHADOW,
  BACKDROP
};

export default createThemeColor(COLOR_ESSENTIAL_OVERRIDE);
