import {
  RefObject
} from 'react';

import useModelContext from './_use-model-context';

export default function useDomInputRef(): RefObject<HTMLInputElement | null> {
  return useModelContext().domInputRef;
}
