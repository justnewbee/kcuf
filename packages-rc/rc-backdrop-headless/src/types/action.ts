import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.REFRESH_VISIBLE;
};

export type TModelDispatch = Dispatch<TModelAction>;
