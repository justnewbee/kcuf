import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf/rc-keyboard-mac';

import {
  throwConfetti
} from './util';
import Keystroke from './rc/keystroke';

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
`;

const NUMBER = '1234567890'.split('');
const NUMBER_SHIFT = '!@#$%^&*()'.split('');
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const SYMBOL = '`-=[]\\;\',./'.split('');
const SYMBOL_SHIFT = '~_+{}|:"<>?'.split('');
const FN = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
const MISC = ['Escape', 'Backspace', 'Delete', 'Tab', 'Space', 'CapsLock', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];
const MISC_ALIAS = ['⎋', '⌫', '⌦', '⇥', '␣', '⇪', '⏎', '↑', '↓', '←', '→', '⇞', '⇟'];
const EXTRA_ALIAS = ['↵', '↩', 'UP', 'DOWN', 'LEFT', 'RIGHT', ' '];

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
    <H1>Combo</H1>
    <Keystroke {...{
      keystroke: 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A Enter',
      onFire: throwConfetti
    }} />
    <Keystroke {...{
      keystroke: '↑ ↑ ↓ ↓ ← → ← → B A B A ⏎',
      onFire: throwConfetti
    }} />
    <Keystroke {...{
      keystroke: 'T E N T H L E V E L T A U R E N C H I E F T A I N',
      onFire: throwConfetti
    }} />
    <Keystroke {...{
      keystroke: 'Ctrl+Z Ctrl+X'
    }} />
    <Keystroke {...{
      keystroke: 'Control+Z Shift+X'
    }} />
    <Keystroke {...{
      keystroke: 'C + +'
    }} />
    <H1>Control ⌃</H1>
    <ScGrid>
      <Keystroke {...{
        keystroke: 'Ctrl+J'
      }} />
      <Keystroke {...{
        keystroke: 'ctrl+j'
      }} />
      <Keystroke {...{
        keystroke: 'Control+J'
      }} />
      <Keystroke {...{
        keystroke: 'control+j'
      }} />
      <Keystroke {...{
        keystroke: '⌃+J'
      }} />
      <Keystroke {...{
        keystroke: '⌃+j'
      }} />
      <Keystroke {...{
        keystroke: '⌃+]'
      }} />
    </ScGrid>
    <H1>Alt ⌥</H1>
    <ScGrid>
      <Keystroke {...{
        keystroke: 'Alt+J'
      }} />
      <Keystroke {...{
        keystroke: 'alt+j'
      }} />
      <Keystroke {...{
        keystroke: 'Option+J'
      }} />
      <Keystroke {...{
        keystroke: 'option+j'
      }} />
      <Keystroke {...{
        keystroke: '⌥+J'
      }} />
      <Keystroke {...{
        keystroke: '⌥+j'
      }} />
      <Keystroke {...{
        keystroke: '⌥+]'
      }} />
      <Keystroke {...{
        keystroke: '⌥+"'
      }} />
    </ScGrid>
    <H1>Shift ⇧</H1>
    <ScGrid>
      <Keystroke {...{
        keystroke: 'Shift+J'
      }} />
      <Keystroke {...{
        keystroke: 'shift+j'
      }} />
      <Keystroke {...{
        keystroke: '⇧+J'
      }} />
      <Keystroke {...{
        keystroke: '⇧+j'
      }} />
      <Keystroke {...{
        keystroke: '⇧+/'
      }} />
    </ScGrid>
    <H1>Number</H1>
    <ScGrid>
      {NUMBER.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <ScGrid>
      {NUMBER_SHIFT.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <H1>Alphabet</H1>
    <ScGrid>
      {ALPHABET.map(v => <Keystroke key={v} {...{
        keystroke: v.toUpperCase()
      }} />)}
    </ScGrid>
    <ScGrid>
      {ALPHABET.map(v => <Keystroke key={v} {...{
        keystroke: v.toLowerCase()
      }} />)}
    </ScGrid>
    <H1>Symbol</H1>
    <ScGrid>
      {SYMBOL.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <ScGrid>
      {SYMBOL_SHIFT.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <H1>F1-12（F11 不行）</H1>
    <ScGrid>
      {FN.map(v => <Keystroke key={v} {...{
        keystroke: v.toUpperCase()
      }} />)}
    </ScGrid>
    <ScGrid>
      {FN.map(v => <Keystroke key={v} {...{
        keystroke: v.toLowerCase()
      }} />)}
    </ScGrid>
    <H1>Alias（你可以用符号表示）</H1>
    <ScGrid>
      {MISC.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <ScGrid>
      {MISC_ALIAS.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
    <ScGrid>
      {EXTRA_ALIAS.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </ScGrid>
  </>;
}