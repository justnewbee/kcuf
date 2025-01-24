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
  type: EAction.TOGGLE_GRAYSCALE;
};

export type TModelDispatch = Dispatch<TModelAction>;
