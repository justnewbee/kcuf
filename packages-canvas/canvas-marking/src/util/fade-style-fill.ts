import {
  IMarkingFillStyleResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStyleFill(style: IMarkingFillStyleResolved): IMarkingFillStyleResolved {
  return {
    ...style,
    color: fadeColor(style.color)
  };
}
