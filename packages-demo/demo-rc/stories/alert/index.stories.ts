import {
  Alert
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    title: 'I Do NOT have a Title',
    children: 'Alert'
  }
};
