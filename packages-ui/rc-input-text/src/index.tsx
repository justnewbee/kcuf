import {
  ForwardedRef,
  ReactElement,
  forwardRef
} from 'react';

import InputTextHeadless, {
  InputTextProps,
  InputTextImperativeRef
} from '@kcuf-ui/rc-input-text-headless';

import Ui from './ui';

function WithProvider(props: InputTextProps, ref: ForwardedRef<InputTextImperativeRef>): ReactElement {
  return <InputTextHeadless {...props}>
    <Ui ref={ref} />
  </InputTextHeadless>;
}

export default forwardRef(WithProvider);

export type {
  InputTextProps,
  InputTextImperativeRef as InputTextRef
} from '@kcuf-ui/rc-input-text-headless';
