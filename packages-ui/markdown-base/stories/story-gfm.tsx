import {
  ReactElement
} from 'react';

import {
  MD_GFM
} from './const';
import Demo from './demo';

export default function StoryGfm(): ReactElement {
  return <Demo {...{
    source: MD_GFM
  }} />;
}
