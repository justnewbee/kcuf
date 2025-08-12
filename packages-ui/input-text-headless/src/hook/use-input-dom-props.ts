import {
  useMemo
} from 'react';

import {
  IInputElementProps
} from '../types';

import useModelProps from './_use-model-props';
import useValue from './use-value';
import useHandleInputFocusIn from './use-handle-input-focus-in';
import useHandleInputFocusOut from './use-handle-input-focus-out';
import useHandleInputCompositionStart from './use-handle-input-composition-start';
import useHandleInputCompositionEnd from './use-handle-input-composition-end';
import useHandleInputChange from './use-handle-input-change';

/**
 * 可以透传给 input 的 DOM props
 */
export default function useInputDomProps(): IInputElementProps {
  const props = useModelProps();
  const value = useValue();
  const handleInputFocusIn = useHandleInputFocusIn();
  const handleInputFocusOut = useHandleInputFocusOut();
  const handleInputChange = useHandleInputChange();
  const handleInputCompositionStart = useHandleInputCompositionStart();
  const handleInputCompositionEnd = useHandleInputCompositionEnd();
  
  return useMemo(() => {
    const {
      addonBefore,
      addonAfter,
      addonPrefix,
      addonSuffix,
      variant,
      fluid,
      round,
      status,
      // trim,
      withClear,
      count,
      // onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onFocusedChange,
      onHoveredChange,
      // 以上属性或是容器扩展，或被接管，剔除
      ...rest
    } = props;
    
    return {
      'aria-autocomplete': 'none',
      autoComplete: 'off',
      ...rest,
      type: 'text',
      value,
      onFocus: handleInputFocusIn,
      onBlur: handleInputFocusOut,
      onCompositionStart: handleInputCompositionStart,
      onCompositionEnd: handleInputCompositionEnd,
      onChange: handleInputChange
    };
  }, [props, value, handleInputFocusIn, handleInputFocusOut, handleInputCompositionStart, handleInputCompositionEnd, handleInputChange]);
}
