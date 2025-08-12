import {
  TChangeReason
} from './common';
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
  props: Omit<IModelProps, 'trim' | 'value' | 'defaultValue' | 'onChange'>;
  state: IModelState;
  dispatch: TModelDispatch;
  controllableValue: string;
  controllableOnChange(value: string, reason: TChangeReason): void;
}
