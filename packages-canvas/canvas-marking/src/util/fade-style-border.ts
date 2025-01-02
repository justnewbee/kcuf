import {
  TMarkingStyleBorderResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStyleBorder(style: TMarkingStyleBorderResolved): TMarkingStyleBorderResolved {
  return {
    ...style,
    color: fadeColor(style.color),
    outerColor: fadeColor(style.outerColor)
  };
}
