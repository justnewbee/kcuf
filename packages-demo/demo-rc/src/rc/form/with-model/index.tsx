import {
  ReactElement
} from 'react';

import Model, {
  FormProps
} from '@kcuf/rc-headless-form';

import Ui from '../ui';

export default function WithProvider(props: FormProps): ReactElement {
  return <Model {...props}>
    <Ui />
  </Model>;
}
