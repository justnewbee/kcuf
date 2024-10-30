import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';
import Keyboard from '@kcuf/rc-keyboard-mac';

import {
  Keystroke
} from './rc';

export default function StoryTarget(): ReactElement {
  const [stateTexArea, setStateTexArea] = useState<HTMLTextAreaElement | null>(null);
  
  return <>
    <MinimalNormalize />
    <Keyboard />
    <textarea ref={setStateTexArea} />
    {stateTexArea ? <Keystroke {...{
      keystroke: 'Shift+X',
      target: stateTexArea
    }} /> : null}
  </>;
}