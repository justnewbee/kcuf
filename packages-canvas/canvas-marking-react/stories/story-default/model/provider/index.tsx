import {
  ReactElement,
  useRef,
  useReducer
} from 'react';

import {
  CanvasMarkingImperativeRef
} from '@kcuf/canvas-marking-react-headless';

import {
  IModelProviderProps,
  IModelState,
  TModelAction
} from '../types';
import reducer from '../reducer';
import Context from '../context';
import {
  createInitialState
} from '../util';

export default function Provider({
  children
}: IModelProviderProps): ReactElement {
  const refImperative = useRef<CanvasMarkingImperativeRef>(null);
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  return <Context value={{
    refImperative,
    state,
    dispatch
  }}>
    {children}
  </Context>;
}
