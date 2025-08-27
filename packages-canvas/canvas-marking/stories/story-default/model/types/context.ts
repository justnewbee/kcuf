import {
  MutableRefObject,
  ReactNode
} from 'react';

import {
  IModelState
} from './state';
import {
  TModelAction,
  TModelDispatch
} from './action';

export type TModelReducer = (state: IModelState, action: TModelAction) => IModelState;

export interface IModelContext {
  refUnmounted: MutableRefObject<boolean>;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps {
  children: ReactNode;
}
