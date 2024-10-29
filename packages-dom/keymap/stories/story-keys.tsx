import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf/rc-keyboard-mac';

import Keystroke from './rc/keystroke';
import {
  GridContainer
} from './rc';

const FUNCTIONAL = ['Escape', 'Backspace', 'Delete', 'Tab', 'Space', 'CapsLock', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];
const FUNCTIONAL_ALIAS = ['⎋', '⌫', '⌦', '⇥', '␣', '⇪', '⏎', '↑', '↓', '←', '→', '⇞', '⇟'];
const EXTRA_ALIAS = ['↵', '↩', 'UP', 'DOWN', 'LEFT', 'RIGHT', ' '];
const FN = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
const NUMBER = '1234567890'.split('');
const NUMBER_SHIFT = '!@#$%^&*()'.split('');
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const SYMBOL = '`-=[]\\;\',./'.split('');
const SYMBOL_SHIFT = '~_+{}|:"<>?'.split('');

export default function StoryKeys(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
    <H1>功能键</H1>
    <GridContainer>
      {FUNCTIONAL.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <H1>功能键 Alias（你可以用符号表示）</H1>
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
    <H1>F1-12（F11 不行）</H1>
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
    <H1>Number</H1>
    <GridContainer>
      {NUMBER.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <GridContainer>
      {NUMBER_SHIFT.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <H1>Alphabet</H1>
    <GridContainer>
      {ALPHABET.map(v => <Keystroke key={v} {...{
        keystroke: v.toUpperCase()
      }} />)}
    </GridContainer>
    <GridContainer>
      {ALPHABET.map(v => <Keystroke key={v} {...{
        keystroke: v.toLowerCase()
      }} />)}
    </GridContainer>
    <H1>Symbol</H1>
    <GridContainer>
      {SYMBOL.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <GridContainer>
      {SYMBOL_SHIFT.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
  </>;
}