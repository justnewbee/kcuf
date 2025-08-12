import useModelState from './_use-model-state';

export default function useFocused(): boolean {
  return useModelState().focused;
}
