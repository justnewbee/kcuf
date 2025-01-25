import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.TOGGLE_DARK;
} | {
  type: EAction.TOGGLE_TEXT;
} | {
  type: EAction.TOGGLE_POLISHED_GRAYSCALE | EAction.TOGGLE_POLISHED_INVERT;
};

export type TModelDispatch = Dispatch<TModelAction>;
