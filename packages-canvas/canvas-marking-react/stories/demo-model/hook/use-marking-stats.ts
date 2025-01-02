import {
  MarkingStats
} from '@kcuf/canvas-marking-react-headless';

import useModelState from './_use-model-state';

export default function useMarkingStats(): MarkingStats | null {
  return useModelState().markingStats;
}
