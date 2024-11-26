import {
  ReactElement
} from 'react';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useDialogTitle(): string | ReactElement | undefined {
  const {
    title
  } = useModelProps();
  const {
    data
  } = useModelState();
  
  return typeof title === 'function' ? title(data) : title;
}
