import {
  ReactElement,
  Ref,
  forwardRef
} from 'react';

import Model, {
  ButtonProps
} from '@kcuf-ui/rc-button-headless';

import Ui from '../ui';

function WithProvider(props: ButtonProps, ref: Ref<HTMLDivElement>): ReactElement {
  return <Model props={props}>
    <Ui ref={ref} />
  </Model>;
}

export default forwardRef(WithProvider);
