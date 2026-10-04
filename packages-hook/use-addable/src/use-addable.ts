import {
  produce
} from 'immer';

import useControllable from '@kcuf-hook/use-controllable';

import {
  TUseAddableReturn,
  TFinder
} from './types';

export default function useAddable<T extends object>(generate: () => T, finder: TFinder<T>, items?: T[], onChange?: (items: T[]) => void): TUseAddableReturn<T> {
  const [controlledValue, controlledOnChange] = useControllable<T[]>([], items, [], onChange);
  
  return [controlledValue, {
    add: () => controlledOnChange([...controlledValue, generate()]),
    update: o => {
      controlledOnChange(produce(controlledValue, draft => {
        const index = draft.findIndex(v => finder(v as T, o));
        
        if (index >= 0) {
          (draft as T[]).splice(index, 1, o);
        }
      }));
    },
    remove: o => {
      controlledOnChange(produce(controlledValue, draft => {
        const index = draft.findIndex(v => finder(v as T, o));
        
        if (index >= 0) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          draft.splice(index, 1);
        }
      }));
    },
    switchPosition: (indexOld: number, indexNew: number): void => {
      controlledOnChange(produce(controlledValue, draft => {
        (draft as T[])[indexNew] = controlledValue[indexOld]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        (draft as T[])[indexOld] = controlledValue[indexNew]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }));
    }
  }];
}
