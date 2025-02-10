import useModelState from './_use-model-state';
import useDispatchSetColor from './use-dispatch-set-color';

export default function useStateColor(): [string, (value: string) => void] {
  const {
    color
  } = useModelState();
  const dispatchSetColor = useDispatchSetColor();
  
  return [color, dispatchSetColor];
}
