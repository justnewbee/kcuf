import {
  IModelValue
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps(): IModelValue['props'] {
  return useModelContext().props;
}
