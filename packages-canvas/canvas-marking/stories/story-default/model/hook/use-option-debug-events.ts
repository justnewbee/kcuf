import useModelState from './_use-model-state';

export default function useOptionDebugEvents(): boolean {
  return useModelState().optionDebugEvents;
}
