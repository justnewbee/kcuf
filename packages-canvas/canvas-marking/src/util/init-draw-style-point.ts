import {
  IMarkingPointStyle,
  TMarkingBorderStyleResolved,
  TMarkingPointStyleResolved
} from '../types';
import {
  DEFAULT_POINT_RADIUS,
  DEFAULT_POINT_RADIUS_ENLARGE,
  DEFAULT_POINT_ALT_COLOR
} from '../const';

export default function initDrawStylePoint(borderStyleResolved: TMarkingBorderStyleResolved, pointStyle?: IMarkingPointStyle, extendFrom?: TMarkingPointStyleResolved): TMarkingPointStyleResolved {
  return extendFrom ? {
    ...extendFrom,
    ...pointStyle
  } : {
    type: 'circle',
    typeMiddle: 'circle',
    radius: DEFAULT_POINT_RADIUS,
    radiusEnlargeWhenClose: DEFAULT_POINT_RADIUS_ENLARGE,
    lineWidth: borderStyleResolved.width,
    lineColor: borderStyleResolved.color,
    fillColor: DEFAULT_POINT_ALT_COLOR,
    crossingLineColor: borderStyleResolved.crossingColor,
    crossingFillColor: 'hsl(0 0% 100%)',
    ...pointStyle
  };
}
