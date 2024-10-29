import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf/rc-keyboard-mac';

import {
  throwConfetti
} from './util';
import {
  GridContainer,
  Keystroke
} from './rc';

export default function StoryCombo(): ReactElement {
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
    <GridContainer>
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
    </GridContainer>
    <H1>Alt ⌥</H1>
    <GridContainer>
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
    </GridContainer>
    <H1>Shift ⇧</H1>
    <GridContainer>
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
    </GridContainer>
  </>;
}