import {
  ReactElement
} from 'react';

import {
  MD_FULL
} from './const';
import Demo from './demo';

export default function StoryDefault(): ReactElement {
  return <Demo {...{
    source: MD_FULL
  }} />;
}
