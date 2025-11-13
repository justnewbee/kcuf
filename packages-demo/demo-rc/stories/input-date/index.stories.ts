import {
  Meta,
  StoryObj
} from '@storybook/react-vite';

import {
  InputDate
} from '../../src';

type TMeta = Meta<typeof InputDate>;
type TStory = StoryObj<TMeta>;

export default {
  title: 'Form/InputDate',
  component: InputDate,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {};
export const Time: TStory = {
  args: {
    type: 'time'
  }
};
export const DateTime: TStory = {
  args: {
    type: 'datetime'
  }
};
