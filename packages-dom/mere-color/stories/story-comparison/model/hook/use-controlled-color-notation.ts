import useModelState from './_use-model-state';
import useDispatchSetColorNotation from './use-dispatch-set-color-notation';

export default function useControlledColorNotation(): [string, (value: string) => void] {
  const {
    colorNotation
  } = useModelState();
  const dispatchSetColorNotation = useDispatchSetColorNotation();
  
  return [colorNotation, dispatchSetColorNotation];
}
