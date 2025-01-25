import useModelState from './_use-model-state';
import useDispatchTogglePolishedGrayscale from './use-dispatch-toggle-polished-grayscale';

export default function useStatePolishedGrayscale(): [boolean, () => void] {
  const {
    polishedGrayscale
  } = useModelState();
  const dispatchToggleGrayscale = useDispatchTogglePolishedGrayscale();
  
  return [polishedGrayscale, dispatchToggleGrayscale];
}
