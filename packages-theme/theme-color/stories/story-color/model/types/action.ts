import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.TOGGLE_DARK | EAction.TOGGLE_TEXT | EAction.TOGGLE_POLISHED_GRAYSCALE | EAction.TOGGLE_POLISHED_INVERT;
} | {
  type: EAction.SET_SEED_GRAY | EAction.SET_SEED_COLORFUL;
  payload: string;
};

export type TModelDispatch = Dispatch<TModelAction>;
