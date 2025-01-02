import {
  IMarkingStyleConfig,
  IMarkingStyleConfigResolved
} from '../types';
import {
  DEFAULT_FILL_ALPHA_EDITING
} from '../const';

import initDrawStyleBorder from './init-draw-style-border';
import initDrawStylePoint from './init-draw-style-point';
import initDrawStyleFill from './init-draw-style-fill';

export default function resolveMarkingStyleConfig(styleConfig?: IMarkingStyleConfig): IMarkingStyleConfigResolved {
  const border = initDrawStyleBorder(styleConfig?.border);
  const borderHovering = initDrawStyleBorder(styleConfig?.borderHovering, border);
  const borderHighlighting = initDrawStyleBorder(styleConfig?.borderHighlighting, borderHovering);
  const borderEditing = initDrawStyleBorder(styleConfig?.borderEditing, borderHovering);
  
  const point = initDrawStylePoint(border, styleConfig?.point);
  const pointHovering = initDrawStylePoint(borderHovering, styleConfig?.pointHovering, point);
  const pointHighlighting = initDrawStylePoint(borderHighlighting, styleConfig?.pointHighlighting, pointHovering);
  const pointEditing = initDrawStylePoint(borderEditing, styleConfig?.pointEditing, pointHovering);
  
  const fill = initDrawStyleFill(border, styleConfig?.fill);
  const fillHovering = initDrawStyleFill(borderHovering, styleConfig?.fillHovering, fill);
  const fillHighlighting = initDrawStyleFill(borderHighlighting, styleConfig?.fillHighlighting, fillHovering);
  const fillEditing = initDrawStyleFill(borderEditing, {
    color: DEFAULT_FILL_ALPHA_EDITING,
    ...styleConfig?.fillEditing
  }, fillHovering);
  
  return {
    border,
    borderHovering,
    borderHighlighting,
    borderEditing,
    point,
    pointHovering,
    pointHighlighting,
    pointEditing,
    fill,
    fillHovering,
    fillHighlighting,
    fillEditing,
    
    borderDiff: styleConfig?.borderDiff
  };
}
