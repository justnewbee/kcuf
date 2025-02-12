import {
  Meta,
  StoryObj
} from '@storybook/react';

import {
  InputNumber
} from '../../src';

type TMeta = Meta<typeof InputNumber>;
type TStory = StoryObj<TMeta>;

const meta = {
  title: 'Form/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {};
