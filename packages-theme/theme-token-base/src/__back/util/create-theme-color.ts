import {
  IColorText,
  IColorBg,
  IColorBorder,
  IThemeColors,
  IColorEssential
} from '../types';
import {
  ESSENTIAL
} from '../const';

import createConstColorBaseText from './create-const-color-base-text';
import createConstColorBaseBg from './create-const-color-base-bg';
import createConstColorBaseBorder from './create-const-color-base-border';
import createConstColorShadow from './create-const-color-base-shadow';
import createConstColorLink from './create-const-color-link';
import createConstColorInput from './create-const-color-input';
import createConstColorButton from './create-const-color-button';

export default function createThemeColor(colorEssentialOverride?: Partial<IColorEssential>): IThemeColors {
  const E = {
    ...ESSENTIAL,
    ...colorEssentialOverride
  };
  const TEXT: IColorText = createConstColorBaseText(E);
  const BG: IColorBg = createConstColorBaseBg(E);
  const BORDER: IColorBorder = createConstColorBaseBorder(E);
  
  return {
    ...TEXT,
    ...BG,
    ...BORDER,
    ...createConstColorShadow(E),
    ...createConstColorLink(TEXT),
    ...createConstColorInput(TEXT, BG, BORDER),
    ...createConstColorButton(TEXT, BG, BORDER)
  };
}
