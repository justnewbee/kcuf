import {
  useMemo
} from 'react';

import {
  triggerFocus,
  TriggerFocusOptions
} from '@kcuf/mere-dom';

import {
  IImperativeRef
} from '../types';

import useModelState from './_use-model-state';

export default function useImperativeRef(): IImperativeRef {
  const {
    domInput
  } = useModelState();
  
  return useMemo((): IImperativeRef => ({
    domInput,
    focus(options?: TriggerFocusOptions): void {
      if (domInput) {
        triggerFocus(domInput, options);
      }
    },
    blur: () => domInput?.blur(),
    select: () => domInput?.select(),
    selectText(start: number, end: number, backward?: boolean) {
      if (domInput) {
        domInput.setSelectionRange(start, end, backward ? 'backward' : undefined);
        domInput.focus();
      }
    }
  }), [domInput]);
}
