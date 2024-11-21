import {
  Dispatch
} from 'react';

import {
  CanvasMarkingStats
} from '@kcuf/canvas-marking-react-headless';

import {
  EAction,
  EDataType
} from '../enum';

import {
  TTogglePluginPayload
} from './common';

export type TModelAction = {
  type: EAction.SET_DATA_TYPE;
  payload: EDataType;
} | {
  type: EAction.SET_STATS;
  payload: CanvasMarkingStats;
} | {
  type: EAction.TOGGLE_DISABLED | EAction.TOGGLE_DESTROYED;
} | {
  type: EAction.TOGGLE_PLUGIN;
  payload: TTogglePluginPayload;
};

export type TModelDispatch = Dispatch<TModelAction>;
