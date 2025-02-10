import useModelState from './_use-model-state';
import useDispatchSetColorType from './use-dispatch-set-color-type';

export default function useStateColorType(): [string, (value: string) => void] {
  const {
    colorType
  } = useModelState();
  const dispatchSetColorType = useDispatchSetColorType();
  
  return [colorType, dispatchSetColorType];
}
