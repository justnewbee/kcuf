import {
  IDialogButtonProps,
  TDialogButton
} from '../types';
import {
  processButtons
} from '../util';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useDialogButtons<T = void, D extends object = Record<string, unknown>>(): IDialogButtonProps<T, D>[] {
  let {
    buttons
  } = useModelProps();
  const {
    data,
    locked
  } = useModelState();
  
  if (typeof buttons === 'function') {
    buttons = buttons(data);
  }
  
  return processButtons(buttons as TDialogButton<T, D>[], locked);
}
