import {
  ReactElement
} from 'react';

import DemoModel from './demo-model';
import DemoUi from './demo-ui';

export default function StoryDefault(): ReactElement {
  return <DemoModel>
    <DemoUi />
  </DemoModel>;
}