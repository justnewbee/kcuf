import useModelState from './_use-model-state';
import useControllableValue from './use-controllable-value';

export default function useValue(): string {
  const {
    value: valueInState,
    composing
  } = useModelState();
  const controllableValue = useControllableValue();

  if (composing) { // 输入法正在输入，仅取 state 中的值
    return valueInState;
  }

  return controllableValue;
}
