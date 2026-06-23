import useModelState from './_use-model-state';
import useDispatchSetColorAlpha from './use-dispatch-set-color-alpha';

export default function useControlledColorAlpha(): [number, (value: number) => void] {
  const {
    colorAlpha
  } = useModelState();
  const dispatchSetColorAlpha = useDispatchSetColorAlpha();
  
  return [colorAlpha, dispatchSetColorAlpha];
}
