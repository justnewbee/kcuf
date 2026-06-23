import useModelState from './_use-model-state';
import useDispatchSetColorInput from './use-dispatch-set-color-input';

export default function useControlledColorInput(): [string, (value: string) => void] {
  const {
    colorInput
  } = useModelState();
  const dispatchSetColor = useDispatchSetColorInput();
  
  return [colorInput, dispatchSetColor];
}
