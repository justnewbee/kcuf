import {
  ReactElement,
  PropsWithChildren,
  useRef,
  useReducer
} from 'react';

import {
  CanvasMarkingImperativeRef
} from '../../../../src';
import {
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
}: PropsWithChildren): ReactElement {
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
