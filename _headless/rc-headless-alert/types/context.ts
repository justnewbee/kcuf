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
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}
