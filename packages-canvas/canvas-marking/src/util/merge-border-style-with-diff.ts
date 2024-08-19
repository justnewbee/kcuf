import {
  IMarkingBorderStyleDiff,
  TMarkingBorderStyleResolved
} from '../types';

import fadeColor from './fade-color';

function desaturateDiff(diff: IMarkingBorderStyleDiff, faded: boolean): IMarkingBorderStyleDiff {
  if (!faded) {
    return diff;
  }
  
  const diffClone: IMarkingBorderStyleDiff = {
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

export default function mergeBorderStyleWithDiff(borderStyle: TMarkingBorderStyleResolved, diff: IMarkingBorderStyleDiff | undefined, faded: boolean): TMarkingBorderStyleResolved {
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