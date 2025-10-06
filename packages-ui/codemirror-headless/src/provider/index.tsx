import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';
import useControllable from '@kcuf-hook/use-controllable';

import {
  IModelProviderProps,
  TModelAction,
  TModelReducer
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
  const isUnmounted = useIsUnmounted();
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange); // 不适合用 `trim`
  const [state, dispatch] = useReducer<TModelReducer, string>(reducer, controllableValue, createInitialState);
  
  const safeDispatch = useCallback((action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  }, [isUnmounted, dispatch]);
  
  return <CodemirrorContext.Provider value={{
    props,
    state,
    controllableValue,
    controllableOnChange,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </CodemirrorContext.Provider>;
}
