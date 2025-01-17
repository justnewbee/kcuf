import {
  ReactNode
} from 'react';

import {
  RequiredSelected
} from '@kcuf/ts-missing-helpers';

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
  props: RequiredSelected<Omit<IModelProps, 'defaultValue'>, 'value' | 'onChange'>;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
