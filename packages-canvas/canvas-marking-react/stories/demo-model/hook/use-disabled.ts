import useModelState from './_use-model-state';

export default function useDisabled(): boolean {
  return useModelState().disabled;
}
