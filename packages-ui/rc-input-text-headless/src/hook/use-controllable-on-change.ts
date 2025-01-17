import {
  IModelValue
} from '../types';

import useModelContext from './_use-model-context';

export default function useControllableOnChange(): IModelValue['controllableOnChange'] {
  return useModelContext().controllableOnChange;
}
