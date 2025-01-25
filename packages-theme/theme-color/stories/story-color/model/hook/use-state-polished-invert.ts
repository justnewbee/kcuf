import useModelState from './_use-model-state';
import useDispatchTogglePolishedInvert from './use-dispatch-toggle-polished-invert';

export default function useStatePolishedInvert(): [boolean, () => void] {
  const {
    polishedInvert
  } = useModelState();
  const dispatchTogglePolishedInvert = useDispatchTogglePolishedInvert();
  
  return [polishedInvert, dispatchTogglePolishedInvert];
}
