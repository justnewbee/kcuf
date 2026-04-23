import {
  ReactElement,
  Ref,
  forwardRef
} from 'react';

import Model, {
  ButtonProps
} from '@kcuf-ui/button-headless';

import Ui from '../ui';

export default forwardRef(function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>): ReactElement {
  return <Model props={props}>
    <Ui ref={ref} />
  </Model>;
});
