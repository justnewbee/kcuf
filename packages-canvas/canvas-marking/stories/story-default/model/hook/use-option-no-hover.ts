import useModelState from './_use-model-state';
import useDispatchSetOptionNoHover from './use-dispatch-set-option-no-hover';

export default function useOptionNoHover(): [boolean, (value: boolean) => void] {
  return [useModelState().optionNoHover, useDispatchSetOptionNoHover()];
}
