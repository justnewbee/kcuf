import useModelState from './_use-model-state';
import useDispatchSetOptionNoEditDragInsertion from './use-dispatch-set-option-no-edit-drag-insertion';

export default function useOptionNoEditDragInsertion(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoEditDragInsertion, useDispatchSetOptionNoEditDragInsertion()];
}
