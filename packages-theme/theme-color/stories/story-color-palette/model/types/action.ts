import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_DARK;
  payload: boolean;
} | {
  type: EAction.SET_SATURATION | EAction.SET_HUE_OFFSET;
  payload: number;
} | {
  type: EAction.SET_SELECTED_HUE_LIGHTNESS;
  payload: [number, number];
};

export type TModelDispatch = Dispatch<TModelAction>;
