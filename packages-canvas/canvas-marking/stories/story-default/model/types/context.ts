import {
  TDomRef
} from './ref';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext {
  domRef: TDomRef;
  state: IModelState;
  dispatch: TModelDispatch;
}
