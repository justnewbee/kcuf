import {
  TMarkingStyleBorderResolved,
  IMarkingStyleBorder
} from '../types';
import {
  DEFAULT_BORDER_STYLE
} from '../const';

import safeMerge from './safe-merge';
import parseConfigColor from './parse-config-color';

export default function initDrawStyleBorder(borderStyle?: IMarkingStyleBorder, extendFrom?: TMarkingStyleBorderResolved): TMarkingStyleBorderResolved {
  const result = safeMerge({
    ...DEFAULT_BORDER_STYLE,
    ...extendFrom
  }, borderStyle);
  
  return {
    ...result,
    outerColor: parseConfigColor(result.color, result.outerColor),
    crossingOuterColor: parseConfigColor(result.crossingColor, result.crossingOuterColor)
  };
}
