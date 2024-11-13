import {
  TMarkingFillStyleResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStyleFill(style: TMarkingFillStyleResolved): TMarkingFillStyleResolved {
  return {
    ...style,
    color: fadeColor(style.color)
  };
}
