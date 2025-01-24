import useModelState from './_use-model-state';
import useDispatchSetHueOffset from './use-dispatch-set-hue-offset';

export default function useStateHueOffset(): [number, (value: number) => void] {
  const {
    hueOffset
  } = useModelState();
  const dispatchSetHueOffset = useDispatchSetHueOffset();
  
  return [hueOffset, dispatchSetHueOffset];
}
