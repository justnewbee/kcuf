import {
  ForwardedRef,
  ReactElement,
  forwardRef
} from 'react';

import InputSwitchHeadless, {
  InputSwitchProps,
  InputSwitchImperativeRef
} from '@kcuf-ui/rc-input-text-headless';

import Ui from '../ui';

function WithProvider(props: InputSwitchProps, ref: ForwardedRef<InputSwitchImperativeRef>): ReactElement {
  return <InputSwitchHeadless {...props}>
    <Ui ref={ref} />
  </InputSwitchHeadless>;
}

export default forwardRef(WithProvider);
