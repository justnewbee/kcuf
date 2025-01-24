import useModelState from './_use-model-state';
import useDispatchSetSaturation from './use-dispatch-set-saturation';

export default function useStateSaturation(): [number, (value: number) => void] {
  const {
    saturation
  } = useModelState();
  const dispatchSetSaturation = useDispatchSetSaturation();
  
  return [saturation, dispatchSetSaturation];
}
