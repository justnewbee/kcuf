import {
  useContext
} from 'react';

import {
  IModelContext
} from '../types';
import Context from '../context';

export default function useModelContext(): IModelContext {
  const context = useContext(Context);
  
  if (!context) {
    throw new Error('Hooks must be used within Dropdown Provider');
  }
  
  return context;
}
