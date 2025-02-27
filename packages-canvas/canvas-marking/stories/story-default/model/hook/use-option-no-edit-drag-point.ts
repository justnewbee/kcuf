import useModelState from './_use-model-state';
import useDispatchSetOptionNoEditDragPoint from './use-dispatch-set-option-no-edit-drag-point';

export default function useOptionNoEditDragPoint(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoEditDragPoint, useDispatchSetOptionNoEditDragPoint()];
}
