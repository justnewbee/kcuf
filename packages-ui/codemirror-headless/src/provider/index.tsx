import {
  ReactElement,
  PropsWithChildren,
  useRef,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';
import useControllable from '@kcuf-hook/use-controllable';

import {
  IModelPropsCodemirror,
  IModelState,
  TModelAction
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function CodemirrorProvider({
  children,
  ...props
}: PropsWithChildren<IModelPropsCodemirror>): ReactElement {
  const domRef = useRef<HTMLDivElement>(null);
  const {
    value,
    defaultValue = '',
    onChange
  } = props;
  const isUnmounted = useIsUnmounted();
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange); // 不适合用 `trim`
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  const safeDispatch = (action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  };
  
  return <Context value={{
    domRef,
    props,
    state,
    controllableValue,
    controllableOnChange,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </Context>;
}
