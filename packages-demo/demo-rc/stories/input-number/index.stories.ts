import {
  Meta,
  StoryObj
} from '@storybook/react-vite';

import {
  InputNumber
} from '../../src';

type TMeta = Meta<typeof InputNumber>;
type TStory = StoryObj<TMeta>;

export default {
  title: 'Form/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {};
