import {
  RefObject
} from 'react';

import useModelContext from './_use-model-context';

export default function useDomRef(): RefObject<HTMLDivElement | null> {
  return useModelContext().domRef;
}
