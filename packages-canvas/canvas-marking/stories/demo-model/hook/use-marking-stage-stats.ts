import {
  MarkingStageStats
} from '../../../src';

import useModelState from './_use-model-state';

export default function useMarkingStageStats(): MarkingStageStats | null {
  return useModelState().markingStageStats;
}