import useModelState from './_use-model-state';
import useDispatchSetSelectedHueLightness from './use-dispatch-set-selected-hue-lightness';

export default function useStateSelectedHueLightness(): [[number, number] | null, (value: [number, number]) => void] {
  const {
    selectedHueLightness
  } = useModelState();
  const dispatchSetSelectedHueLightness = useDispatchSetSelectedHueLightness();
  
  return [selectedHueLightness, dispatchSetSelectedHueLightness];
}
