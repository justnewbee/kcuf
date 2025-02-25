import {
  a11yBrightness
} from '@kcuf/mere-color';

import {
  IMarkingStylePoint,
  TMarkingStyleBorderResolved,
  TMarkingStylePointResolved
} from '../types';
import {
  DEFAULT_POINT_RADIUS
} from '../const';

export default function initDrawStylePoint(borderStyleResolved: TMarkingStyleBorderResolved, pointStyle?: IMarkingStylePoint, extendFrom?: TMarkingStylePointResolved): TMarkingStylePointResolved {
  return extendFrom ? {
    ...extendFrom,
    ...pointStyle
  } : {
    shape: 'circle',
    shapeMiddle: 'circle',
    radius: DEFAULT_POINT_RADIUS,
    radiusMiddle: DEFAULT_POINT_RADIUS,
    radiusEnlargeWhenClose: 0.66,
    lineWidth: borderStyleResolved.width,
    lineColor: borderStyleResolved.color,
    fillColor: a11yBrightness(borderStyleResolved.color) >= 180 ? 'hsl(240 20% 50%)' : 'hsl(0 0% 100%)',
    crossingLineColor: borderStyleResolved.crossingColor,
    crossingFillColor: 'hsl(0 0% 100%)',
    ...pointStyle
  };
}
