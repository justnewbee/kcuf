import {
  IModelProps
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps<T = unknown>(): IModelProps<T> {
  return useModelContext().props as IModelProps<T>;
}
