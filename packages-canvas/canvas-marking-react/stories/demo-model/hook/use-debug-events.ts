import useModelState from './_use-model-state';

export default function useDebugEvents(): boolean {
  return useModelState().debugEvents;
}
