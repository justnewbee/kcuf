import {
  ReactElement
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  IModelProviderProps
} from '../types';
import Context from '../context';

export default function Provider({
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable(false, value, defaultValue, onChange);
  
  return <Context.Provider value={{
    props: {
      ...props,
      value: controllableValue,
      onChange: controllableOnChange
    }
  }}>
    {children}
  </Context.Provider>;
}
