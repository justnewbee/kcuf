import {
  ReactElement
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';

import DemoModel from './demo-model';
import DemoUi from './demo-ui';

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <DemoModel>
      <DemoUi />
    </DemoModel>
  </>;
}