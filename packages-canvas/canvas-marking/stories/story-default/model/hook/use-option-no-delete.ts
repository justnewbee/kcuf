import useModelState from './_use-model-state';
import useDispatchSetOptionNoDelete from './use-dispatch-set-option-no-delete';

export default function useOptionNoDelete(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoDelete, useDispatchSetOptionNoDelete()];
}
