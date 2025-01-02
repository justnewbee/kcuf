import {
  IMarkingStyleBorderDiff,
  TMarkingStyleBorderResolved
} from '../types';

import fadeColor from './fade-color';

function desaturateDiff(diff: IMarkingStyleBorderDiff, faded: boolean): IMarkingStyleBorderDiff {
  if (!faded) {
    return diff;
  }
  
  const diffClone: IMarkingStyleBorderDiff = {
    ...diff
  };
  
  if (diffClone.color) {
    diffClone.color = fadeColor(diffClone.color);
  }
  
  if (diffClone.outerColor) {
    diffClone.outerColor = fadeColor(diffClone.outerColor);
  }
  
  return diffClone;
}

export default function mergeBorderStyleWithDiff(borderStyle: TMarkingStyleBorderResolved, diff: IMarkingStyleBorderDiff | undefined, faded: boolean): TMarkingStyleBorderResolved {
  if (!diff) {
    return borderStyle;
  }
  
  const {
    color = borderStyle.color,
    width = borderStyle.width,
    outerColor = borderStyle.outerColor,
    outerWidth = borderStyle.outerWidth
  } = desaturateDiff(diff, faded);
  
  return color !== borderStyle.color || width !== borderStyle.width || outerColor !== borderStyle.outerColor || outerWidth !== borderStyle.outerWidth ? {
    ...borderStyle,
    color,
    width,
    outerColor,
    outerWidth
  } : borderStyle;
}
