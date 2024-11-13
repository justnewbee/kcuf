import {
  ReactNode
} from 'react';

import {
  IModelProps
} from './props';
import {
  IModelState
} from './state';
import {
  TModelAction,
  TModelDispatch
} from './action';

export type IModelReducer = (state: IModelState, action: TModelAction) => IModelState;

export interface IModelContext {
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
