import {
  IModelProps
} from './props';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';
import {
  TDomRef,
  TImperativeRef
} from './ref';

export interface IModelContext {
  ref?: TImperativeRef;
  domRef: TDomRef;
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}
