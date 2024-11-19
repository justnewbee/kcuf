import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

import useModelState from './_use-model-state';

export default function useMarkingStage(): MarkingStageClassType | null {
  return useModelState().markingStage;
}
