import {
  IModelPropsCodemirror
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps(): IModelPropsCodemirror {
  return useModelContext().props;
}
