import {
  ReactElement
} from 'react';

import KeyboardModel, {
  KeyboardProps
} from '@kcuf-ui/rc-keyboard-mac-headless';

import Ui from '../ui';

export default function WithProvider(props: KeyboardProps): ReactElement {
  return <KeyboardModel {...props}>
    <Ui />
  </KeyboardModel>;
}
