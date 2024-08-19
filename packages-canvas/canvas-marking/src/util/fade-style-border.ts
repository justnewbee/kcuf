import {
  TMarkingBorderStyleResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStyleBorder(style: TMarkingBorderStyleResolved): TMarkingBorderStyleResolved {
  return {
    ...style,
    color: fadeColor(style.color),
    outerColor: fadeColor(style.outerColor)
  };
}