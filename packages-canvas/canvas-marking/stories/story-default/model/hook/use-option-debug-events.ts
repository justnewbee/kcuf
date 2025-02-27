import useModelState from './_use-model-state';
import useDispatchSetOptionDebugEvents from './use-dispatch-set-option-debug-events';

export default function useOptionDebugEvents(): [boolean, (value: boolean) => void] {
  return [useModelState().optionDebugEvents, useDispatchSetOptionDebugEvents()];
}
