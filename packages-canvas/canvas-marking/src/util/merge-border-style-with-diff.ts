import {
  fadeOut
} from '@kcuf/mere-color';

import {
  IMarkingStyleBorderDiff,
  TMarkingStyleBorderResolved
} from '../types';

function desaturateDiff(diff: IMarkingStyleBorderDiff): IMarkingStyleBorderDiff {
  const diffClone: IMarkingStyleBorderDiff = {
    ...diff
  };
  
  if (diffClone.color) {
    diffClone.color = fadeOut(diffClone.color, 65, 5);
  }
  
  if (diffClone.outerColor) {
    diffClone.outerColor = fadeOut(diffClone.outerColor, 65, 5);
  }
  
  return diffClone;
}

export default function mergeBorderStyleWithDiff(borderStyle: TMarkingStyleBorderResolved, diff?: IMarkingStyleBorderDiff): TMarkingStyleBorderResolved {
  if (!diff) {
    return borderStyle;
  }
  
  const {
    color = borderStyle.color,
    width = borderStyle.width,
    outerColor = borderStyle.outerColor,
    outerWidth = borderStyle.outerWidth
  } = desaturateDiff(diff);
  
  return color !== borderStyle.color || width !== borderStyle.width || outerColor !== borderStyle.outerColor || outerWidth !== borderStyle.outerWidth ? {
    ...borderStyle,
    color,
    width,
    outerColor,
    outerWidth
  } : borderStyle;
}
