import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  H1
} from '@kcuf/demo-rc';
import KeyboardMac from '@kcuf/rc-keyboard-mac';

import {
  GridContainer,
  Keystroke
} from './rc';

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
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