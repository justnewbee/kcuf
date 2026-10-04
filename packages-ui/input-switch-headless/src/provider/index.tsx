import {
  ReactElement,
  PropsWithChildren
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  IModelProps
} from '../types';
import Context from '../context';

export default function Provider({
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: PropsWithChildren<IModelProps>): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable(false, value, defaultValue, onChange);
  
  return <Context value={{
    props: {
      ...props,
      value: controllableValue,
      onChange: controllableOnChange
    }
  }}>
    {children}
  </Context>;
}
