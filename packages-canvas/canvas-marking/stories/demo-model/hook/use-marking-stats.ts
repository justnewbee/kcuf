import {
  MarkingStats
} from '../../../src';

import useModelState from './_use-model-state';

export default function useMarkingStats(): MarkingStats | null {
  return useModelState().markingStats;
}
