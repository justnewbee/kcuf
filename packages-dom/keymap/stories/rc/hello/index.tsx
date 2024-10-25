import {
  ReactElement,
  useEffect
} from 'react';

import {
  P
} from '@kcuf/demo-rc';

import keymap from '../../../src';

export default function Hello(): ReactElement {
  useEffect(() => keymap({
    'H E L L O': () => {
      alert('The keys \'h\', \'e\', \'l\', \'l\', and \'o\' were pressed in order');
    }
  }), []);
  
  return <P><kbd>h</kbd><kbd>e</kbd><kbd>l</kbd><kbd>l</kbd><kbd>o</kbd></P>;
}