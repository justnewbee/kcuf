import useModelState from './_use-model-state';

export default function useOptionEditable(): boolean {
  return useModelState().optionEditable;
}
