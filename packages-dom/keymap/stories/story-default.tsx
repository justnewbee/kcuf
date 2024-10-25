import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';

import KeymapDemo from './rc/keymap-demo';
import {
  throwConfetti
} from './util';

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <H1>Single</H1>
    <KeymapDemo {...{
      keystroke: '1'
    }} />
    <KeymapDemo {...{
      keystroke: 'p'
    }} />
    <H1>Modifiers</H1>
    <KeymapDemo {...{
      keystroke: 'shift+a'
    }} />
    <KeymapDemo {...{
      keystroke: 'Shift+B'
    }} />
    <KeymapDemo {...{
      keystroke: '⇧+C'
    }} />
    <KeymapDemo {...{
      keystroke: 'Ctrl+E'
    }} />
    <KeymapDemo {...{
      keystroke: 'Control+F'
    }} />
    <KeymapDemo {...{
      keystroke: '⌃+G'
    }} />
    <KeymapDemo {...{
      keystroke: 'Alt+H'
    }} />
    <KeymapDemo {...{
      keystroke: 'Option+I'
    }} />
    <KeymapDemo {...{
      keystroke: '⌥+J'
    }} />
    <H1>Combo</H1>
    <KeymapDemo {...{
      keystroke: 'Ctrl+Z Ctrl+X'
    }} />
    <KeymapDemo {...{
      keystroke: 'Control+Z Shift+X'
    }} />
    <KeymapDemo {...{
      keystroke: 'h e l l o'
    }} />
    <KeymapDemo {...{
      keystroke: 'C + +'
    }} />
    <KeymapDemo {...{
      keystroke: 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A Enter',
      onFire: throwConfetti
    }} />
    <KeymapDemo {...{
      keystroke: '↑ ↑ ↓ ↓ ← → ← → B A B A ⏎',
      onFire: throwConfetti
    }} />
    <KeymapDemo {...{
      keystroke: 'T E N T H L E V E L T A U R E N C H I E F T A I N',
      onFire: throwConfetti
    }} />
    <H1>加号 <code>+</code> 和空格有特殊用途</H1>
    <KeymapDemo {...{
      keystroke: ' '
    }} />
    <KeymapDemo {...{
      keystroke: '␣'
    }} />
    <KeymapDemo {...{
      keystroke: '+'
    }} />
  </>;
}