import {
  IMarkingBorderStyle,
  IMarkingFillStyle,
  IMarkingAuxiliaryLine,
  IMarkingStageOptions
} from '../types';

export const DEFAULT_POINT_INSERTION_MIN_DISTANCE = 48;
export const DEFAULT_FILL_ALPHA_EDITING = 0.21;
export const DEFAULT_MAGNET_RADIUS = 10;

export const DEFAULT_BORDER_STYLE: Required<IMarkingBorderStyle> = {
  lineJoin: 'round',
  width: 2,
  color: 'hsl(208 100% 50%)',
  outerWidth: 0,
  outerColor: 'hsl(0 0% 100%)',
  crossingColor: 'hsl(0 100% 50%)',
  crossingOuterColor: 'hsl(0 0% 100%)'
};

export const DEFAULT_FILL_STYLE: Required<IMarkingFillStyle> = {
  color: 0.17,
  crossingColor: 0.17
};

export const DEFAULT_AUXILIARY_STYLE: Required<IMarkingAuxiliaryLine> = {
  distance: 10,
  width: 1,
  color: 'hsl(185 100% 50%)',
  colorNear: 'hsl(39 100% 50%)',
  dash: [5, 10]
};

export const DEFAULT_MARKING_OPTIONS: IMarkingStageOptions<never> = {
  imageBgc: 'hsl(0 0% 0% / 3%)', // 无图的时候，默认给一点点背景
  doubleClickInterval: 200,
  selectClickMode: 'single',
  pluginTooltip: true,
  pluginZoom: true,
  pluginMove: true,
  pluginStats: false
};
