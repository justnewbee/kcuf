import useModelProps from './_use-model-props';

export default function useDurationOut(): number {
  return useModelProps().durationOut ?? 500;
}
