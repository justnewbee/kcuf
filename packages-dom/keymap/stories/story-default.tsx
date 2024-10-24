import {
  ReactElement,
  useEffect
} from 'react';

import keymap from '../src';

import {
  Button
} from '@kcuf/demo-rc';

import {
  throwConfetti
} from './util';

export default function StoryDefault(): ReactElement {
  useEffect(() => {
    keymap(window, {
      'Shift+D': () => {
        alert('The \'Shift\' and \'d\' keys were pressed at the same time');
      },
      'h e l l o': () => {
        alert('The keys \'y\', \'e\', \'e\', and \'t\' were pressed in order');
      },
      '$mod+([1-9])': event => {
        event.preventDefault();
        alert(`Either 'Control+${event.key}' or 'Meta+${event.key}' were pressed`);
      }
    });
    
    const KonamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'KeyB',
      'KeyA',
      'Enter'
    ].join(' ');
    
    keymap(window, {
      [KonamiCode]: throwConfetti
    });
  }, []);
  
  return <Button>FUCKME</Button>;
}