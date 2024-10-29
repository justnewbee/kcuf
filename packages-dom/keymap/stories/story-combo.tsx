import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1,
  H2
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf/rc-keyboard-mac';

import {
  throwConfetti
} from './util';
import {
  Keystroke
} from './rc';

export default function StoryCombo(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
    <H1>Combo</H1>
    <H2>Konami</H2>
    <Keystroke {...{
      keystroke: 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A Enter',
      onFire: throwConfetti
    }} />
    <Keystroke {...{
      keystroke: '↑ ↑ ↓ ↓ ← → ← → B A B A ⏎',
      onFire: throwConfetti
    }} />
    <H2>Warcraft III</H2>
    <Keystroke {...{
      keystroke: 'T E N T H L E V E L T A U R E N C H I E F T A I N',
      onFire: throwConfetti
    }} />
    <H2>Others</H2>
    <Keystroke {...{
      keystroke: 'Ctrl+Z Ctrl+X'
    }} />
    <Keystroke {...{
      keystroke: 'Control+Z Shift+X'
    }} />
    <Keystroke {...{
      keystroke: 'C + +'
    }} />
  </>;
}