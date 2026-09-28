import {
  CanvasMarkingOptions
} from '@kcuf/canvas-marking';

import {
  IPlugins
} from './common';
import {
  TImperativeRef
} from './ref';

export interface IModelProps<T = unknown> extends CanvasMarkingOptions<T> {
  className?: string; // 提供有限的样式自定义
  plugins?: IPlugins;
}

export interface IModelPropsWithRef<T = unknown> extends IModelProps<T> {
  ref?: TImperativeRef<T>;
}
