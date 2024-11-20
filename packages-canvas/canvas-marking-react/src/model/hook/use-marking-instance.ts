import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

import useModelState from './_use-model-state';

export default function useMarkingInstance(): MarkingStageClassType | null {
  return useModelState().markingInstance;
}
