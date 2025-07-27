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
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    title: 'I Do NOT have a Title',
    children: 'Alert'
  }
};
