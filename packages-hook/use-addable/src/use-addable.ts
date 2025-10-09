import {
  useCallback
} from 'react';
import {
  produce
} from 'immer';

import useControllable from '@kcuf-hook/use-controllable';

import {
  IUseAddableReturn,
  TFinder
} from './types';

export default function useAddable<T extends object>(generate: () => T, finder: TFinder<T>, items?: T[], onChange?: (items: T[]) => void): IUseAddableReturn<T> {
  const [controlledValue, controlledOnChange] = useControllable<T[]>([], items, [], onChange);
  
  const handleAdd = useCallback(() => {
    controlledOnChange([...controlledValue, generate()]);
  }, [generate, controlledValue, controlledOnChange]);
  const handleUpdate = useCallback((o: T) => {
    controlledOnChange(produce(controlledValue, draft => {
      const index = draft.findIndex(v => finder(v as T, o));
      
      if (index >= 0) {
        (draft as T[]).splice(index, 1, o);
      }
    }));
  }, [finder, controlledValue, controlledOnChange]);
  const handleRemove = useCallback((o: T) => {
    controlledOnChange(produce(controlledValue, draft => {
      const index = draft.findIndex(v => finder(v as T, o));
      
      if (index >= 0) {
        draft.splice(index, 1);
      }
    }));
  }, [finder, controlledValue, controlledOnChange]);
  
  return {
    items: controlledValue,
    add: handleAdd,
    update: handleUpdate,
    remove: handleRemove
  };
}
