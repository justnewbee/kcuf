import {
  Dispatch
} from 'react';

import {
  MarkingStats
} from '@kcuf/canvas-marking-react-headless';

import {
  EAction,
  EDataType
} from '../enum';

import {
  TTogglePluginPayload
} from './common';

export type TModelAction = {
  type: EAction.TOGGLE_DESTROYED | EAction.TOGGLE_DEBUG_EVENTS;
} | {
  type: EAction.SET_DATA_TYPE;
  payload: EDataType;
} | {
  type: EAction.SET_MARKING_STATS;
  payload: MarkingStats;
} | {
  type: EAction.TOGGLE_PLUGIN;
  payload: TTogglePluginPayload;
};

export type TModelDispatch = Dispatch<TModelAction>;
