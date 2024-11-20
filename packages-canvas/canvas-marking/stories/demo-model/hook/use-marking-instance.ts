import {
  CanvasMarkingClassType
} from '../../../src';

import useModelState from './_use-model-state';

export default function useMarkingInstance(): CanvasMarkingClassType | null {
  return useModelState().markingInstance;
}
