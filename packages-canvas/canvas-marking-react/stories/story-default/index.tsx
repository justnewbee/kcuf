import {
  ReactElement
} from 'react';

import Model from './model';
import Ui from './ui';

export default function StoryDefault(): ReactElement {
  return <Model>
    <Ui /></Model>;
}
