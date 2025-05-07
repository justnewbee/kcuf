import {
  ReactElement
} from 'react';

import {
  COMMON
} from './const';
import Demo from './demo';

export default function StoryCommon(): ReactElement {
  return <Demo {...{
    source: COMMON
  }} />;
}
