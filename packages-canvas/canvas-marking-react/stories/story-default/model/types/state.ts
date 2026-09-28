import {
  MarkingStats,
  MarkingConfigItem
} from '../../../../src';
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
  plugins: TStatePlugins;
  markings: MarkingConfigItem[];
  markingStats: MarkingStats | null;
}
