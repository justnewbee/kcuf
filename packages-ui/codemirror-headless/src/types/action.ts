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
  type: EAction.SET_CODEMIRROR_INFO;
  payload: ICodemirrorInfo;
};

export type TModelDispatch = Dispatch<TModelAction>;
