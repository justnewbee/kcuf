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
  TModelDispatch
} from './action';

export interface IModelContext {
  props: Omit<IModelProps, 'trim' | 'value' | 'defaultValue' | 'onChange'>;
  state: IModelState;
  dispatch: TModelDispatch;
  controllableValue: string;
  controllableOnChange(value: string, reason: TChangeReason): void;
}
