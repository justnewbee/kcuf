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
  const borderHover = initDrawStyleBorder({
    shadowColor: 'hsl(0 0% 0% / 67%)',
    shadowBlur: 4,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    ...styleConfig?.borderHover
  }, border);
  const borderHighlight = initDrawStyleBorder(styleConfig?.borderHighlight, borderHover);
  const borderSelect = initDrawStyleBorder(styleConfig?.borderSelect, borderHover);
  
  const point = initDrawStylePoint(border, styleConfig?.point);
  const pointHover = initDrawStylePoint(borderHover, styleConfig?.pointHover, point);
  const pointHighlight = initDrawStylePoint(borderHighlight, styleConfig?.pointHighlight, pointHover);
  const pointSelect = initDrawStylePoint(borderSelect, styleConfig?.pointSelect, pointHover);
  
  const fill = initDrawStyleFill(border, styleConfig?.fill);
  const fillHover = initDrawStyleFill(borderHover, styleConfig?.fillHover, fill);
  const fillHighlight = initDrawStyleFill(borderHighlight, styleConfig?.fillHighlight, fillHover);
  const fillSelect = initDrawStyleFill(borderSelect, {
    color: DEFAULT_FILL_ALPHA_EDITING,
    ...styleConfig?.fillSelect
  }, fillHover);
  
  return {
    border,
    borderHover,
    borderHighlight,
    borderSelect,
    point,
    pointHover,
    pointHighlight,
    pointSelect,
    fill,
    fillHover,
    fillHighlight,
    fillSelect,
    borderDiff: styleConfig?.borderDiff
  };
}
