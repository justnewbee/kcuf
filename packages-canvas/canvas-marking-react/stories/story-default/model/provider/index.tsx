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
  TModelReducer
} from '../types';
import reducer from '../reducer';
import Context from '../context';
import {
  createInitialState
} from '../util';

const DEFAULT_STATE = createInitialState();

export default function Provider({
  children
}: IModelProviderProps): ReactElement {
  const refImperative = useRef<CanvasMarkingImperativeRef | null>(null);
  const [state, dispatch] = useReducer<TModelReducer>(reducer, DEFAULT_STATE);
  
  return <Context.Provider value={{
    refImperative,
    state,
    dispatch
  }}>
    {children}
  </Context.Provider>;
}
