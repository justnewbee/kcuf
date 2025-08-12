import {
  ReactElement
} from 'react';

import InputSwitchHeadless, {
  InputSwitchProps
} from '@kcuf-ui/input-switch-headless';

import Ui from '../ui';

export default function WithProvider(props: InputSwitchProps): ReactElement {
  return <InputSwitchHeadless {...props}>
    <Ui />
  </InputSwitchHeadless>;
}
