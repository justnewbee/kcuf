import {
  ReactNode
} from 'react';

import {
  IDialogProps
} from './common';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext<R = void, D extends object = Record<string, unknown>> {
  props: IDialogProps<R, D>;
  state: IModelState<R, D>;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps<R = void, D extends object = Record<string, unknown>> {
  props: IDialogProps<R, D>;
  children: ReactNode;
}
