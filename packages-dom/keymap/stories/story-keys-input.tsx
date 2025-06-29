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

const NUMBER = '1234567890'.split('');
const NUMBER_SHIFT = '!@#$%^&*()'.split('');
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const SYMBOL = '`-=[]\\;\',./'.split('');
const SYMBOL_SHIFT = '~_+{}|:"<>?'.split('');

export default function StoryKeysInput(): ReactElement {
  return <>
    <MinimalNormalize />
    <KeyboardMac />
    <H1>输入键</H1>
    <H2>Number</H2>
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
    <H2>Alphabet</H2>
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
    <H2>Symbol</H2>
    <GridContainer>
      {SYMBOL.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer>
    <GridContainer>
      {SYMBOL_SHIFT.map(v => <Keystroke key={v} {...{
        keystroke: v
      }} />)}
    </GridContainer></>;
}
