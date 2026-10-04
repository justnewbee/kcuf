import {
  ReactPortal
} from 'react';
import {
  createPortal
} from 'react-dom';

import DialogHeadless, {
  DialogProps
} from '@kcuf-ui/dialog-headless';

import Ui from './ui';

export default function Dialog(props: DialogProps<any, any>): ReactPortal { // eslint-disable-line @typescript-eslint/no-explicit-any
  return createPortal(<DialogHeadless {...props}>
    <Ui />
  </DialogHeadless>, document.body);
}
