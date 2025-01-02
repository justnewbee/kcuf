import {
  IMarkingStyleFillResolved
} from '../types';

import fadeColor from './fade-color';

export default function fadeStyleFill(style: IMarkingStyleFillResolved): IMarkingStyleFillResolved {
  return {
    ...style,
    color: fadeColor(style.color)
  };
}
