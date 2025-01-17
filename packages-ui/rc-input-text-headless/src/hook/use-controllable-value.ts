import useModelContext from './_use-model-context';

export default function useControllableValue(): string {
  return useModelContext().controllableValue;
}
