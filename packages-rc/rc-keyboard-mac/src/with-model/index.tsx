import {
  ReactElement
} from 'react';

import KeyboardModel, {
  KeyboardProps
} from '@kcuf/rc-headless-keyboard-mac';

import Ui from '../ui';

export default function WithProvider(props: KeyboardProps): ReactElement {
  return <KeyboardModel {...props}>
    <Ui />
  </KeyboardModel>;
}
