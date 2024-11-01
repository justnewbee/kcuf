import useModelState from './_use-model-state';

export default function useFullscreen(): boolean {
  return useModelState().fullscreen;
}