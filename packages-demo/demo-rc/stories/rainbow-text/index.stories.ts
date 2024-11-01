import {
  RainbowText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Typo/RainbowText',
  component: RainbowText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    children: 'RainbowText'
  }
};