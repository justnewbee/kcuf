import {
  Em
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/Em',
  component: Em,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'Emphasis'
  }
};
