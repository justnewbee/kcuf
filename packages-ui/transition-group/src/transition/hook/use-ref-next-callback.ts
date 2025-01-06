import {
  MutableRefObject
} from 'react';

import useModelContext from './_use-model-context';

export default function useRefNextCallback(): MutableRefObject<null | (() => void)> {
  return useModelContext().nextCallbackRef;
}
