import {
  RainbowText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/RainbowText',
  component: RainbowText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'RainbowText'
  }
};
