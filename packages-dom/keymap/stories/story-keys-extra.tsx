import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1,
  H2
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf-ui/rc-keyboard-mac';

import Keystroke from './rc/keystroke';
import {
  GridContainer
} from './rc';

const FN = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
const FUNCTIONAL = ['Escape', 'Backspace', 'Delete', 'Tab', 'Space', 'CapsLock', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];
const FUNCTIONAL_ALIAS = ['⎋', '⌫', '⌦', '⇥', '␣', '⇪', '⏎', '↑', '↓', '←', '→', '⇞', '⇟'];
const EXTRA_ALIAS = ['↵', '↩', 'UP', 'DOWN', 'LEFT', 'RIGHT', ' '];

export default function StoryKeysExtra(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
    <H1>辅助键</H1>
    <H2>F1-12（F11 不行）</H2>
    <GridContainer>
      {FN.map(v => <Keystroke key={v} {...{
        keystroke: v.toUpperCase()
      }} />)}
    </GridContainer>
    <GridContainer>
      {FN.map(v => <Keystroke key={v} {...{
        keystroke: v.toLowerCase()
      }} />)}
    </GridContainer>
    <H2>功能键</H2>
    <GridContainer>
      {FUNCTIONAL.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <H2>功能键 Alias（你可以用符号表示）</H2>
    <GridContainer>
      {FUNCTIONAL_ALIAS.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <GridContainer>
      {EXTRA_ALIAS.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
  </>;
}
