import {
  ReactElement,
  useEffect
} from 'react';

import {
  P
} from '@kcuf/demo-rc';

import keymap from '../../../src';
import {
  throwConfetti
} from '../../util';

const KonamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'B',
  'A',
  'Enter'
].join(' ');

export default function Konami(): ReactElement {
  useEffect(() => keymap(KonamiCode, throwConfetti), []);
  
  return <P><kbd>↑</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><kbd>←</kbd><kbd>→</kbd><kbd>B</kbd><kbd>A</kbd><kbd>↵</kbd></P>;
}