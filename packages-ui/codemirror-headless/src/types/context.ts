import {
  RefObject,
  ReactElement
} from 'react';

import {
  ICodemirrorProps
} from './props';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext {
  refDom: RefObject<HTMLDivElement | null>;
  props: ICodemirrorProps;
  state: IModelState;
  dispatch: TModelDispatch;
  controllableValue: string;
  controllableOnChange(value: string): void;
}

export interface IModelProviderProps extends ICodemirrorProps {
  children: ReactElement;
}
