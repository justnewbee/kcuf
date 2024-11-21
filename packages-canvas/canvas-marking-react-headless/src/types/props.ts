import {
  CanvasMarkingOptions
} from '@kcuf/canvas-marking';

import {
  IPlugins
} from './common';

export interface IModelProps<T = unknown> extends CanvasMarkingOptions<T> {
  className?: string; // 有限的样式自定义
  plugins?: IPlugins;
}
