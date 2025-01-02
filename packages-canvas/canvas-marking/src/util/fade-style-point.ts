import {
  TMarkingStylePointResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStylePoint(style: TMarkingStylePointResolved): TMarkingStylePointResolved {
  return {
    ...style,
    lineColor: fadeColor(style.lineColor),
    fillColor: fadeColor(style.fillColor)
  };
}
