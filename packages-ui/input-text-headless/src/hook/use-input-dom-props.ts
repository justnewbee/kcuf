import {
  IInputElementProps
} from '../types';

import useModelProps from './_use-model-props';
import useValue from './use-value';
import useHandleInputCompositionStart from './use-handle-input-composition-start';
import useHandleInputCompositionEnd from './use-handle-input-composition-end';
import useHandleInputChange from './use-handle-input-change';

/**
 * 可以透传给 input 的 DOM props
 */
export default function useInputDomProps(): IInputElementProps {
  const props = useModelProps();
  const value = useValue();
  const handleInputChange = useHandleInputChange();
  const handleInputCompositionStart = useHandleInputCompositionStart();
  const handleInputCompositionEnd = useHandleInputCompositionEnd();
  
  const {
    addonBefore,
    addonAfter,
    addonPrefix,
    addonSuffix,
    variant,
    fluid,
    round,
    status,
    withClear,
    count,
    // 以上属性或是容器扩展，或被接管，剔除
    ...rest
  } = props;
  
  return {
    'aria-autocomplete': 'none',
    autoComplete: 'off',
    ...rest,
    type: 'text',
    value,
    onCompositionStart: handleInputCompositionStart,
    onCompositionEnd: handleInputCompositionEnd,
    onChange: handleInputChange
  } as IInputElementProps;
}
