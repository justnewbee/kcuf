import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useModelProps from './_use-model-props';

export default function useIsShiftOn(): () => boolean {
  const {
    codes
  } = useModelProps();
  
  return useCallback(() => {
    return codes ? codes.includes(EKeyboardCode.SHIFT_LEFT) || codes.includes(EKeyboardCode.SHIFT_RIGHT) : false;
  }, [codes]);
}