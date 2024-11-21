import {
  CanvasMarkingStats,
  MarkingConfigItem
} from '@kcuf/canvas-marking-react-headless';

import {
  EDataType
} from '../enum';

import {
  TStatePlugins
} from './common';

export interface IModelState {
  disabled: boolean;
  destroyed: boolean;
  dataType: EDataType;
  image: string;
  markings: MarkingConfigItem[];
  plugins: TStatePlugins;
  stats: CanvasMarkingStats | null;
}
