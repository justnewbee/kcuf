import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

import {
  ICodemirrorInfo
} from './common';

export type TModelAction = {
  type: EAction.INIT;
  payload: ICodemirrorInfo;
};

export type TModelDispatch = Dispatch<TModelAction>;
