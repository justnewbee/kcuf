import useModelProps from './_use-model-props';

export default function useDurationIn(): number {
  return useModelProps().durationIn ?? 500;
}
