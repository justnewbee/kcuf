import {
  Meta,
  StoryObj
} from '@storybook/react';

import {
  Select
} from '../../src';

type TMeta = Meta<typeof Select>;
type TStory = StoryObj<TMeta>;

const meta = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    datasource: [{
      value: '12345'
    }, {
      value: '54321'
    }]
  }
};
