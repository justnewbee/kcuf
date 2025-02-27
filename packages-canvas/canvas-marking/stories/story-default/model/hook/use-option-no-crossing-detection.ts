import useModelState from './_use-model-state';
import useDispatchSetOptionNoCrossingDetection from './use-dispatch-set-option-no-crossing-detection';

export default function useOptionNoCrossingDetection(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoCrossingDetection, useDispatchSetOptionNoCrossingDetection()];
}
