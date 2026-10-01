import {
  RefObject
} from 'react';

import {
  IModelPropsCodemirror
} from './props';
import {
  IModelState
} from './state';
import {
  TModelDispatch
} from './action';

export interface IModelContext {
  domRef: RefObject<HTMLDivElement | null>;
  props: IModelPropsCodemirror;
  state: IModelState;
  dispatch: TModelDispatch;
  controllableValue: string;
  controllableOnChange(value: string): void;
}
