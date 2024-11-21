import {
  MarkingConfigItem
} from '@kcuf/canvas-marking-react-headless';

import useModelState from './_use-model-state';

export default function useDataMarkings(): MarkingConfigItem[] {
  return useModelState().markings;
}
