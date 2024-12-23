import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';
import Keyboard from '@kcuf-ui/rc-keyboard-mac';

import {
  Keystroke
} from './rc';

export default function Story$Mod(): ReactElement {
  return <>
    <MinimalNormalize />
    <Keyboard />
    <H1>
      <code>$mod</code>
      {' '}
      will help determine Ctrl or Meta
    </H1>
    <Keystroke {...{
      keystroke: '$mod+X'
    }} />
  </>;
}
