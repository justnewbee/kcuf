import useModelState from './_use-model-state';
import useDispatchToggleInvert from './use-dispatch-toggle-invert';

export default function useStateInvert(): [boolean, () => void] {
  const {
    invert
  } = useModelState();
  const dispatchToggleInvert = useDispatchToggleInvert();
  
  return [invert, dispatchToggleInvert];
}
