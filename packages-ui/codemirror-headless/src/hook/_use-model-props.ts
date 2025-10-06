import {
  ICodemirrorProps
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps(): ICodemirrorProps {
  return useModelContext().props;
}
