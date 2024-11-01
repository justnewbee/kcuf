import {
  ReactPortal
} from 'react';
import {
  createPortal
} from 'react-dom';

import BackdropModel, {
  BackdropProps
} from '@kcuf/rc-headless-backdrop';

import Ui from '../ui';

export default function WithProvider(props: BackdropProps): ReactPortal {
  return createPortal(<BackdropModel {...props}>
    <Ui />
  </BackdropModel>, document.body);
}
