import {
  DEFAULT_DURATION
} from '../const';

import useModelProps from './_use-model-props';

export default function useDurationEnter(): number {
  return useModelProps().durationEnter ?? DEFAULT_DURATION;
}
