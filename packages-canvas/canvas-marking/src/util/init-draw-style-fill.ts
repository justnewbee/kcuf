import {
  IMarkingFillStyle,
  TMarkingBorderStyleResolved,
  TMarkingFillStyleResolved
} from '../types';
import {
  DEFAULT_FILL_STYLE
} from '../const';

import parseConfigColor from './parse-config-color';

export default function initDrawStyleFill(borderStyleResolved: TMarkingBorderStyleResolved, fillStyle?: IMarkingFillStyle, extendFrom?: TMarkingFillStyleResolved): TMarkingFillStyleResolved {
  const result = {
    ...DEFAULT_FILL_STYLE,
    ...extendFrom,
    ...fillStyle
  };
  
  return {
    ...result,
    color: parseConfigColor(borderStyleResolved.color, result.color),
    crossingColor: parseConfigColor(borderStyleResolved.crossingColor, result.crossingColor || result.color)
  };
}
