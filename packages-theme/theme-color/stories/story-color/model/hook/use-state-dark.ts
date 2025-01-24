import useModelState from './_use-model-state';
import useDispatchToggleDark from './use-dispatch-toggle-dark';

export default function useStateDark(): [boolean, () => void] {
  const {
    dark
  } = useModelState();
  const dispatchToggleDark = useDispatchToggleDark();
  
  return [dark, dispatchToggleDark];
}
