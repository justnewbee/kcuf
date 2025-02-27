import useModelState from './_use-model-state';
import useDispatchSetOptionNoClick from './use-dispatch-set-option-no-click';

export default function useOptionNoClick(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoClick, useDispatchSetOptionNoClick()];
}
