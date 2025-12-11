import {
  RefObject
} from 'react';

import useModelContext from './_use-model-context';

export default function useRefDom(): RefObject<HTMLDivElement | null> {
  return useModelContext().refDom;
}
