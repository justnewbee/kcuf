import useModelProps from './_use-model-props';
import useControllableValue from './use-controllable-value';

export default function useCountInfo(): string {
  const {
    maxLength,
    count
  } = useModelProps();
  const len = useControllableValue().length;
  
  if (count === false) {
    return '';
  }
  
  if (maxLength) {
    return `${len} / ${maxLength}`;
  }
  
  if (count === true) {
    return `${len}`;
  }
  
  return '';
}
