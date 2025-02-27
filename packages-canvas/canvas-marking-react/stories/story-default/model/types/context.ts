import {
  ReactNode
} from 'react';

import {
  TMutableRefImperative
} from './common';
import {
  IModelState
} from './state';
import {
  TModelAction,
  TModelDispatch
} from './action';

export type TModelReducer = (state: IModelState, action: TModelAction) => IModelState;

export interface IModelContext {
  refImperative: TMutableRefImperative;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps {
  children: ReactNode;
}
