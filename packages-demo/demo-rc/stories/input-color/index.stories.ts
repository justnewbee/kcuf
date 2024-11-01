import {
  InputColor
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Form/InputColor',
  component: InputColor,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    defaultValue: 'InputColor'
  }
};