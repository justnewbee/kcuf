import {
  TDomRef
} from '../types';

import useModelContext from './_use-model-context';

export default function useDomRef(): TDomRef {
  return useModelContext().domRef;
}
