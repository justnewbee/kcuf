import {
  MarkingStageClassType
} from '../../../src';

import useModelState from './_use-model-state';

export default function useMarkingStage(): MarkingStageClassType | null {
  return useModelState().markingStage;
}
