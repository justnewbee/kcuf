import {
  ReactElement
} from 'react';

import {
  ICodemirrorProps
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
  props: ICodemirrorProps;
  state: IModelState;
  controllableValue: string;
  controllableOnChange(value: string): void;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps extends ICodemirrorProps {
  children: ReactElement;
}
