import {
  IColorEssential
} from '../types';

const TRANSPARENT = 'transparent';
const WHITE = 'hsl(0 0% 100%)';
const BLACK = 'hsl(0 0% 0%)';
const INVERSE = 'hsl(0 0% 100%)';
const INVERSE_BG = 'hsl(0 0% 0%)';
const BRAND = 'hsl(234 100% 62%)';
const BRAND_HOVER = 'hsl(232 100% 70%)';
const BRAND_ACTIVE = 'hsl(236 70% 51%)';
const ACCENT = 'hsl(234 100% 62%)';
const ACCENT_HOVER = 'hsl(232 100% 70%)';
const ACCENT_ACTIVE = 'hsl(236 70% 51%)';
const EMPHASIS = 'hsl(25 100% 50%)'; // 突出说明，如「金额」、「最重要链接」等，用于 em 或未读标记,
const DANGER = 'hsl(0 100% 39%)';
const CODE = 'hsl(210 100% 60%)';
const GRAY_PRIMARY = 'hsl(0 0% 20%)';
const GRAY_SECONDARY = 'hsl(0 0% 40%)';
const GRAY_TERTIARY = 'hsl(0 0% 60%)';
const GRAY_DISABLED = 'hsl(210 11% 78%)';
const GRAY_PRIMARY_BD = 'hsl(210 10% 84%)';
const GRAY_SECONDARY_BD = 'hsl(220 6% 90%)';
const GRAY_TERTIARY_BD = 'hsl(0 0% 92%)';
const GRAY_DISABLED_BD = 'hsl(220 6% 90%)';
const GRAY_PRIMARY_BG = 'hsl(0 0% 100%)'; // 视觉上第一层级的背景色（用于 level1 的导航、dialog、dropdown 等）
const GRAY_SECONDARY_BG = 'hsl(200 16% 96%)'; // 视觉上第二层级的背景色（用于 level2 的导航）
const GRAY_TERTIARY_BG = 'hsl(0 0% 93%)'; // 视觉上第三层级的背景色（用于 body）
const GRAY_DISABLED_BG = 'hsl(220 6% 90%)';
const GRAY_SECONDARY_FADE_BG = 'hsl(201 100% 14% / 4%)'; // 等价于 BG_SECONDARY
const GRAY_TERTIARY_FADE_BG = 'hsl(0 0% 0% / 7%)'; // 等价于 BG_TERTIARY
const HELP = 'hsl(0 0% 53%)';
const INFO = 'hsl(210 100% 39%)';
const SUCCESS = 'hsl(137 65% 34%)';
const WARNING = 'hsl(41 100% 63%)';
const ERROR = 'hsl(3 70% 50%)';
const HELP_TINT = 'hsl(0 0% 97%)';
const INFO_TINT = 'hsl(206 67% 95%)';
const SUCCESS_TINT = 'hsl(136 71% 96%)';
const WARNING_TINT = 'hsl(47 100% 93%)';
const ERROR_TINT = 'hsl(4 70% 96%)';
const HELP_TINT_FADE = 'hsl(0 0% 0% / 3%)';
const INFO_TINT_FADE = 'hsl(206 100% 40% / 7%)';
const SUCCESS_TINT_FADE = 'hsl(136 100% 42% / 7%)';
const WARNING_TINT_FADE = 'hsl(47 100% 50% / 14%)';
const ERROR_TINT_FADE = 'hsl(4 100% 41% / 7%)';
const SHADOW = 'hsl(0 0% 0% / 16%)';
const BACKDROP = 'hsl(0 0% 0% / 20%)';

export const COLOR_ESSENTIAL: IColorEssential = {
  TRANSPARENT,
  WHITE,
  BLACK,
  INVERSE,
  INVERSE_BG,
  BRAND,
  BRAND_HOVER,
  BRAND_ACTIVE,
  ACCENT,
  ACCENT_HOVER,
  ACCENT_ACTIVE,
  DANGER,
  EMPHASIS,
  CODE,
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
  SUCCESS,
  WARNING,
  ERROR,
  HELP_TINT,
  INFO_TINT,
  SUCCESS_TINT,
  WARNING_TINT,
  ERROR_TINT,
  HELP_TINT_FADE,
  INFO_TINT_FADE,
  SUCCESS_TINT_FADE,
  WARNING_TINT_FADE,
  ERROR_TINT_FADE,
  SHADOW,
  BACKDROP
};
