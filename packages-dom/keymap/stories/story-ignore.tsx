import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';
import Keyboard from '@kcuf-ui/keyboard-mac';

import {
  Keystroke
} from './rc';

function ignore(e: KeyboardEvent): boolean | void {
  if (e.target && (e.target as Element).tagName === 'TEXTAREA') {
    return true;
  }
}

export default function StoryTarget(): ReactElement {
  const [stateTexArea, setStateTexArea] = useState<HTMLTextAreaElement | null>(null);
  
  return <>
    <MinimalNormalize />
    <Keyboard />
    <textarea placeholder="Cmd+Z" ref={setStateTexArea} />
    {stateTexArea ? <Keystroke {...{
      keystroke: 'Cmd+Z',
      target: stateTexArea
    }} /> : null}
    <Keystroke {...{
      keystroke: 'Cmd+Z',
      ignore
    }} />
  </>;
}
