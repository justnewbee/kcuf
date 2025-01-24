import useModelState from './_use-model-state';
import useDispatchToggleGrayscale from './use-dispatch-toggle-grayscale';

export default function useStateGrayscale(): [boolean, () => void] {
  const {
    grayscale
  } = useModelState();
  const dispatchToggleGrayscale = useDispatchToggleGrayscale();
  
  return [grayscale, dispatchToggleGrayscale];
}
