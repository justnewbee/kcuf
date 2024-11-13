import {
  Button
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Form/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    children: 'Button'
  }
};
