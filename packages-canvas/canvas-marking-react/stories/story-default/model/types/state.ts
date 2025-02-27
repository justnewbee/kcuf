import {
  MarkingStats,
  MarkingConfigItem
} from '@kcuf/canvas-marking-react-headless';

import {
  EDataType
} from '../enum';

import {
  TStatePlugins
} from './common';

export interface IModelState {
  destroyed: boolean;
  debugEvents: boolean;
  dataType: EDataType;
  image: string;
  markings: MarkingConfigItem[];
  plugins: TStatePlugins;
  markingStats: MarkingStats | null;
}
