import useModelState from './_use-model-state';
import useDispatchToggleText from './use-dispatch-toggle-text';

export default function useStateText(): [boolean, () => void] {
  const {
    text
  } = useModelState();
  const dispatchToggleText = useDispatchToggleText();
  
  return [text, dispatchToggleText];
}
