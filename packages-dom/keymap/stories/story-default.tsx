import {
  ReactElement,
  useEffect
} from 'react';

import {
  P
} from '@kcuf/demo-rc';

import keymap from '../src';

import Hello from './rc/hello';
import Konami from './rc/konami';

export default function StoryDefault(): ReactElement {
  useEffect(() => keymap('Shift+D', () => {
    alert('The \'Shift\' and \'d\' keys were pressed at the same time');
  }), []);
  useEffect(() => keymap('$mod+([1-9])', event => {
    event.preventDefault();
    alert(`Either 'Control+${event.key}' or 'Meta+${event.key}' were pressed`);
  }), []);
  
  return <>
    <P><kbd>Shift+D</kbd></P>
    <Hello />
    <Konami />
  </>;
}