import {
  EDialogSize
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useDialogSize(): number | EDialogSize {
  const {
    size
  } = useModelProps();
  const {
    data
  } = useModelState();
  
  return (typeof size === 'function' ? size(data) : size) as unknown as number | EDialogSize;
}
