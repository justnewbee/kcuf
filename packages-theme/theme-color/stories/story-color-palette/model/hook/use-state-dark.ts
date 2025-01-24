import useModelState from './_use-model-state';
import useDispatchSetDark from './use-dispatch-set-dark';

export default function useStateDark(): [boolean, (value: boolean) => void] {
  const {
    dark
  } = useModelState();
  const dispatchSetDark = useDispatchSetDark();
  
  return [dark, dispatchSetDark];
}
