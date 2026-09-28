import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import useModelState from './_use-model-state';

export default function useMarkingInstance(): CanvasMarkingClassType | null {
  return useModelState().markingInstance;
}
