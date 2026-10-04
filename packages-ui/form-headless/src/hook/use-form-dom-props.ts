import {
  FormHTMLAttributes
} from 'react';

import useModelProps from './_use-model-props';
import useHandleSubmit from './use-handle-submit';

export default function useFormDomProps(): FormHTMLAttributes<HTMLFormElement> {
  const props = useModelProps();
  const handleSubmit = useHandleSubmit();
  
  const {
    items,
    preventDefault,
    dense,
    ...rest
  } = props;
  
  return {
    ...rest,
    onSubmit: handleSubmit
  };
}
