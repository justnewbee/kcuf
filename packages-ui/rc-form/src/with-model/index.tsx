import {
  ReactElement
} from 'react';

import Model, {
  FormProps
} from '@kcuf-ui/rc-form-headless';

import Ui from '../ui';

export default function WithProvider(props: FormProps): ReactElement {
  return <Model {...props}>
    <Ui />
  </Model>;
}
