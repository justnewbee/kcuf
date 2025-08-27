import {
  MutableRefObject,
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

export type TModelReducer = (state: IModelState, action: TModelAction) => IModelState;

export interface IModelContext {
  refUnmounted: MutableRefObject<boolean>;
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
