import useModelState from './_use-model-state';
import useDispatchSetOptionNoEditDragWhole from './use-dispatch-set-option-no-edit-drag-whole';

export default function useOptionNoEditDragWhole(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoEditDragWhole, useDispatchSetOptionNoEditDragWhole()];
}
