import {
  ReactNode
} from 'react';

import {
  TMutableRefImperative
} from './common';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext {
  refImperative: TMutableRefImperative;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps {
  children: ReactNode;
}
