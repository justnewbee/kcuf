import {
  ReactElement
} from 'react';

import {
  MD_COMMON
} from './const';
import Demo from './demo';

export default function StoryCommon(): ReactElement {
  return <Demo {...{
    source: MD_COMMON
  }} />;
}
