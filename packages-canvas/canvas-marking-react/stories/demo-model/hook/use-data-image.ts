import useModelState from './_use-model-state';

export default function useDataImage(): string {
  return useModelState().image;
}
