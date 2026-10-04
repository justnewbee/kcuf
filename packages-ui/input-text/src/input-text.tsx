import {
  ReactElement
} from 'react';

import InputTextHeadless, {
  InputTextProps
} from '@kcuf-ui/input-text-headless';

import Ui from './ui';

export default function InputText(props: InputTextProps): ReactElement {
  return <InputTextHeadless {...props}>
    <Ui />
  </InputTextHeadless>;
}
