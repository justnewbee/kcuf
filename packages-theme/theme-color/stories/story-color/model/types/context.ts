import {
  ReactNode
} from 'react';

import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext {
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps {
  children: ReactNode;
}
