import {
  Strong
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/Strong',
  component: Strong,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'Strong'
  }
};
