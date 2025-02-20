import {
  IMarkingStyleBorderDiff,
  TMarkingStyleBorderResolved
} from '../types';

export default function mergeBorderStyleWithDiff(borderStyle: TMarkingStyleBorderResolved, diff?: IMarkingStyleBorderDiff): TMarkingStyleBorderResolved {
  if (!diff) {
    return borderStyle;
  }
  
  const {
    color = borderStyle.color,
    width = borderStyle.width,
    outerColor = borderStyle.outerColor,
    outerWidth = borderStyle.outerWidth
  } = diff;
  
  return color !== borderStyle.color || width !== borderStyle.width || outerColor !== borderStyle.outerColor || outerWidth !== borderStyle.outerWidth ? {
    ...borderStyle,
    color,
    width,
    outerColor,
    outerWidth
  } : borderStyle;
}
