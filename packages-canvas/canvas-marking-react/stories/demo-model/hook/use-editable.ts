import useModelState from './_use-model-state';

export default function useEditable(): boolean {
  return useModelState().editable;
}
