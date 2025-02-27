import useModelState from './_use-model-state';
import useDispatchSetOptionNoEditRemovePoint from './use-dispatch-set-option-no-edit-remove-point';

export default function useOptionNoEditRemovePoint(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoEditRemovePoint, useDispatchSetOptionNoEditRemovePoint()];
}
