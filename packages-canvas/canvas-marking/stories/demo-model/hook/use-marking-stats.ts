import {
  CanvasMarkingStats
} from '../../../src';

import useModelState from './_use-model-state';

export default function useMarkingStats(): CanvasMarkingStats | null {
  return useModelState().markingStats;
}
