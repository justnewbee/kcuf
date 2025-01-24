import {
  Alert
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    // layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    title: 'I Do NOT have a Title',
    children: 'Alert'
  }
};
