import {
  IModelPropsDialog
} from './common';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext<R = void, D extends object = Record<string, unknown>> {
  props: IModelPropsDialog<R, D>;
  state: IModelState<R, D>;
  dispatch: TModelDispatch;
}
