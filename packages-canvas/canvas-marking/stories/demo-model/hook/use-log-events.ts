import useModelState from './_use-model-state';

export default function useLogEvents(): boolean {
  return useModelState().logEvents;
}
