import {
  Code
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/Code',
  component: Code,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'const a = 1;'
  }
};
