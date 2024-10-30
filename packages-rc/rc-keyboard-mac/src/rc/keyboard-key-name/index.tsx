import {
  ReactElement
} from 'react';

import {
  EKeyboardCode
} from '../../enum';
import {
  IKeyboardKeyNameProps
} from '../../types';
import {
  getKeyboardKeyDisplayName
} from '../../util';
import KeyboardEventDetails from '../keyboard-event-details';

export default function KeyboardKeyName({
  data,
  displayEvent
}: IKeyboardKeyNameProps): ReactElement {
  if (displayEvent && data.code === EKeyboardCode.SPACE) {
    return <KeyboardEventDetails />;
  }
  
  const name = getKeyboardKeyDisplayName(data);
  
  return <>{Array.isArray(name) ? name.map(vv => <div key={`${vv}`}>{vv}</div>) : name}</>;
}