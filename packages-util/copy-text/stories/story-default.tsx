import {
  ReactElement,
  useState
} from 'react';

import copyText from '../src';

export default function StoryDefault(): ReactElement {
  const [stateText, setStateText] = useState('copy-text via code');
  const [stateCopied, setStateCopied] = useState<boolean>(false);
  
  return <>
    <textarea {...{
      value: stateText,
      onChange: e => {
        setStateText(e.currentTarget.value);
        setStateCopied(false);
      }
    }} />
    <br />
    <button {...{
      onClick: () => copyText(stateText).then(setStateCopied)
    }}>copy-text</button>
    <span>{stateCopied ? 'copied' : 'not copied'}</span>
  </>;
}
