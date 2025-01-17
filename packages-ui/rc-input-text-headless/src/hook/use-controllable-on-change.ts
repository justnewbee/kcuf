import {
  IModelContext
} from '../types';

import useModelContext from './_use-model-context';

export default function useControllableOnChange(): IModelContext['controllableOnChange'] {
  return useModelContext().controllableOnChange;
}
