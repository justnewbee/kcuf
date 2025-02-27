import useModelState from './_use-model-state';
import useDispatchSetOptionNoSelect from './use-dispatch-set-option-no-select';

export default function useOptionNoSelect(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoSelect, useDispatchSetOptionNoSelect()];
}
