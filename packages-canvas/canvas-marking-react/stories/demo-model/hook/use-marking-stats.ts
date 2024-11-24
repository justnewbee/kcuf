import {
  CanvasMarkingStats
} from '@kcuf/canvas-marking-react-headless';

import useModelState from './_use-model-state';

export default function useMarkingStats(): CanvasMarkingStats | null {
  return useModelState().markingStats;
}
