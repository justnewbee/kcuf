import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useCapsLock(): boolean {
  const props = useModelProps();
  const state = useModelState();
  
  return props.capsLock ?? state.capsLock;
}