import useModelState from './_use-model-state';
import useDispatchSetOptionNoEdit from './use-dispatch-set-option-no-edit';

export default function useOptionNoEdit(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoEdit, useDispatchSetOptionNoEdit()];
}
