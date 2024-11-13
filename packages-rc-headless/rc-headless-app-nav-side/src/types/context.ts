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

export interface IModelValue {
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}
