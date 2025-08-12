import {
  IModelContext
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps(): IModelContext['props'] {
  return useModelContext().props;
}
