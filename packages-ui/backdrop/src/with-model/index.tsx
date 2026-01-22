import {
  ReactPortal
} from 'react';
import {
  createPortal
} from 'react-dom';

import BackdropHeadless, {
  BackdropProps
} from '@kcuf-ui/backdrop-headless';

import Ui from '../ui';

export default function WithProvider(props: BackdropProps): ReactPortal {
  return createPortal(<BackdropHeadless {...props}>
    <Ui />
  </BackdropHeadless>, document.body);
}
