import {
  Meta,
  StoryObj
} from '@storybook/react-vite';

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

export const Default: TStory = {
  args: {
    datasource: [{
      value: '12345'
    }, {
      value: '54321',
      label: 'This can be a very lo-o-o-o-o-o-ng label'
    }]
  }
};
