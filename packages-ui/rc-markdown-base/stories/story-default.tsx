import {
  ReactElement
} from 'react';

import {
  FULL
} from './const';
import Demo from './demo';

export default function StoryDefault(): ReactElement {
  return <Demo {...{
    source: FULL
  }} />;
}
