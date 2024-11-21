import useModelState from './_use-model-state';

export default function useDestroyed(): boolean {
  return useModelState().destroyed;
}
