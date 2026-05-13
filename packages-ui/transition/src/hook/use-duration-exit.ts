import useModelProps from './_use-model-props';
import useDurationEnter from './use-duration-enter';

export default function useDurationExit(): number {
  const durationEnter = useDurationEnter();
  
  return useModelProps().durationExit ?? durationEnter;
}
