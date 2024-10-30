import {
  ReactElement
} from 'react';

import KeyboardModel, {
  KeyboardModelProps
} from '../model';
import Ui from '../ui';

export default function WithProvider(props: KeyboardModelProps): ReactElement {
  return <KeyboardModel {...props}>
    <Ui />
  </KeyboardModel>;
}
