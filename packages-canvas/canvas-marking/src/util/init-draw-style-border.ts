import {
  TMarkingStyleBorderResolved,
  IMarkingStyleBorder
} from '../types';
import {
  DEFAULT_BORDER_STYLE
} from '../const';

import parseConfigColor from './parse-config-color';

export default function initDrawStyleBorder(borderStyle?: IMarkingStyleBorder, extendFrom?: TMarkingStyleBorderResolved): TMarkingStyleBorderResolved {
  const result = {
    ...DEFAULT_BORDER_STYLE,
    ...extendFrom,
    ...borderStyle
  };
  
  return {
    ...result,
    outerColor: parseConfigColor(result.color, result.outerColor),
    crossingOuterColor: parseConfigColor(result.crossingColor, result.crossingOuterColor)
  };
}
