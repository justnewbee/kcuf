import {
  Ref,
  ReactElement,
  forwardRef
} from 'react';

import InputTextHeadless, {
  InputTextProps,
  InputTextImperativeRef
} from '@kcuf-ui/input-text-headless';

import Ui from '../ui';

export default forwardRef(function InputText(props: InputTextProps, ref: Ref<InputTextImperativeRef>): ReactElement {
  return <InputTextHeadless {...props}>
    <Ui ref={ref} />
  </InputTextHeadless>;
});
