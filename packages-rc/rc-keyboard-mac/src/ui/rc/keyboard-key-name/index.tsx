import {
  ReactElement
} from 'react';

import {
  KeyboardCode,
  KeyData,
  useProps
} from '../../../model';
import {
  getKeyboardKeyDisplayName
} from '../../util';
import KeyboardEventDetails from '../keyboard-event-details';

interface IProps {
  data: KeyData;
}

export default function KeyboardKeyName({
  data
}: IProps): ReactElement {
  const {
    displayEvent
  } = useProps();
  
  if (displayEvent && data.code === KeyboardCode.SPACE) {
    return <KeyboardEventDetails />;
  }
  
  const name = getKeyboardKeyDisplayName(data);
  
  return <>{Array.isArray(name) ? name.map(vv => <div key={`${vv}`}>{vv}</div>) : name}</>;
}