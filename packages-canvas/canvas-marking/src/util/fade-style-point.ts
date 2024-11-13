import {
  TMarkingPointStyleResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStylePoint(style: TMarkingPointStyleResolved): TMarkingPointStyleResolved {
  return {
    ...style,
    lineColor: fadeColor(style.lineColor),
    fillColor: fadeColor(style.fillColor)
  };
}
