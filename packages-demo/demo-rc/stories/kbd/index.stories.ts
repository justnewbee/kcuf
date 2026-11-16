import {
  Kbd
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: '⌘ + K'
  }
};
