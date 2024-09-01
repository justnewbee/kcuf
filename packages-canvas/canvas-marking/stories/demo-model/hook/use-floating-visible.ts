import useModelState from './_use-model-state';

export default function useFloatingVisible(): boolean {
  return useModelState().floatingVisible;
}