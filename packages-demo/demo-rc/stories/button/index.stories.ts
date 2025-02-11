import {
  Meta,
  StoryObj
} from '@storybook/react';

import {
  Button
} from '../../src';

type TMeta = Meta<typeof Button>;
type TStory = StoryObj<TMeta>;

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
