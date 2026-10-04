import {
  useImperativeHandle
} from 'react';

import {
  triggerFocus,
  TriggerFocusOptions
} from '@kcuf/mere-dom';

import {
  IModelImperative
} from '../types';

import useModelContext from './_use-model-context';

export default function useImperative(): void {
  const {
    ref,
    domInputRef
  } = useModelContext();
  
  useImperativeHandle(ref, (): IModelImperative => ({
    focus(options?: TriggerFocusOptions): void {
      if (domInputRef.current) {
        triggerFocus(domInputRef.current, options);
      }
    },
    blur: () => domInputRef.current?.blur(),
    select: () => domInputRef.current?.select(),
    selectText(start: number, end: number, backward?: boolean) {
      if (domInputRef.current) {
        domInputRef.current.setSelectionRange(start, end, backward ? 'backward' : undefined);
        domInputRef.current.focus();
      }
    }
  }));
}
