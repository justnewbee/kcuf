import {
  ReactElement,
  useRef,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';
import useControllable from '@kcuf-hook/use-controllable';

import {
  IModelProviderProps,
  IModelState,
  TModelAction
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import CodemirrorContext from '../context';
import Lifecycle from '../lifecycle';

export default function CodemirrorProvider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const {
    value,
    defaultValue = '',
    onChange
  } = props;
  const refDom = useRef<HTMLDivElement>(null);
  const isUnmounted = useIsUnmounted();
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange); // 不适合用 `trim`
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  const safeDispatch = useCallback((action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  }, [isUnmounted, dispatch]);
  
  return <CodemirrorContext value={{
    refDom,
    props,
    state,
    controllableValue,
    controllableOnChange,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </CodemirrorContext>;
}
