import {
  IMarkingPointStyle,
  TMarkingBorderStyleResolved,
  TMarkingPointStyleResolved
} from '../types';

export default function initDrawStylePoint(borderStyleResolved: TMarkingBorderStyleResolved, pointStyle?: IMarkingPointStyle, extendFrom?: TMarkingPointStyleResolved): TMarkingPointStyleResolved {
  return extendFrom ? {
    ...extendFrom,
    ...pointStyle
  } : {
    type: 'circle',
    typeMiddle: 'circle',
    radius: 4,
    lineWidth: borderStyleResolved.width,
    lineColor: borderStyleResolved.color,
    fillColor: 'hsl(0 0% 100%)',
    crossingLineColor: borderStyleResolved.crossingColor,
    crossingFillColor: 'hsl(0 0% 100%)',
    ...pointStyle
  };
}