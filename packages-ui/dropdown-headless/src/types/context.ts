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

export interface IContextForContent {
  visible: boolean;
  showDrop(): void;
  hideDrop(): void;
}
